<template>
  <footer class="footer">
    <div class="stats">
      访问次数：<span id="vercount_value_site_pv">😯</span>次 | 访客人数：<span id="vercount_value_site_uv">😯</span>人
    </div>
    <div class="powered">Powered by <a href="https://workers.cloudflare.com/" target="_blank"
        rel="noopener noreferrer">Cloudflare Workers. © <a href="https://github.com/willow-god/FlareDrive-R2" target="_blank"
        rel="noopener noreferrer">FlareDrive-R2</a>. All rights reserved.</a></div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>


<style scoped>
.footer {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  background-color: #ffffff77;
  font-size: 16px;
  border-radius: 50% 50% 0 0;

}

.icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 25px;
}

.icon-link {
  width: 28px;
  height: 28px;
  display: inline-block;
  fill: #2c2c2c;
  transition: fill 0.3s;
}

.icon-link:hover {
  fill: #444;
}

.stats {
  margin: 10px 0;
  color: #444;
}

.project-links {
  font-size: 14px;
  color: #444;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  text-align: center;
}

.project-links a {
  color: #444;
  text-decoration: none;
}

.project-links a:hover {
  color: #222;
}

.powered {
  margin-top: 10px;
  color: #444;
}

.powered a {
  color: #444;
  text-decoration: none;
}

.powered a:hover {
  color: #222;
}
</style>
