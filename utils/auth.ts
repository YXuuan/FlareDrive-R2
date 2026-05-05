const THUMBNAIL_PREFIX = "_$flaredrive$/thumbnails/";

function parseAllowList(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function matchesAllowList(targetPath, allowList) {
  if (allowList.includes("*")) return true;
  return allowList.some((allow) => targetPath.startsWith(allow));
}

function getAllowListForRequest(context) {
  const headers = new Headers(context.request.headers);
  const authorization = headers.get("Authorization");
  if (authorization && authorization.startsWith("Basic ")) {
    const account = atob(authorization.split("Basic ")[1]);
    if (account && context.env[account]) {
      return parseAllowList(context.env[account]);
    }
  }
  if (context.env["GUEST"]) {
    return parseAllowList(context.env["GUEST"]);
  }
  return null;
}

export function can_access_path(context, targetPath) {
  // 1. 缩略图路径始终允许访问 (通常是 GET)
  if (targetPath.startsWith(THUMBNAIL_PREFIX)) return true;

  const method = context.request.method; // 获取当前请求方法
  const headers = new Headers(context.request.headers);
  const authorization = headers.get("Authorization");

  // 2. 检查是否有 Basic Auth 凭据
  if (authorization && authorization.startsWith("Basic ")) {
    try {
      const account = atob(authorization.split("Basic ")[1]);
      // 如果是已知账号，则按照该账号的 AllowList 执行（通常认为账号拥有读写权限）
      if (account && context.env[account]) {
        const allowList = parseAllowList(context.env[account]);
        return matchesAllowList(targetPath, allowList);
      }
    } catch (e) {
      // Base64 解码失败处理
    }
  }

  // 3. 如果没有账号或账号无效，尝试 GUEST 逻辑
  if (context.env["GUEST"]) {
    // 【核心改动】：如果当前是写操作（非 GET/HEAD/OPTIONS），GUEST 直接拒绝
    const isWriteOperation = !["GET", "HEAD", "OPTIONS"].includes(method);
    if (isWriteOperation) {
      return false; 
    }

    // 如果是读操作，再检查 GUEST 的路径白名单
    const guestAllowList = parseAllowList(context.env["GUEST"]);
    return matchesAllowList(targetPath, guestAllowList);
  }

  return false;
}

export function get_allow_list(context) {
  return getAllowListForRequest(context);
}

export function get_auth_status(context) {
  const dopath = context.request.url.split("/api/write/items/")[1];
  if (!dopath) return false;
  return can_access_path(context, dopath);
}
