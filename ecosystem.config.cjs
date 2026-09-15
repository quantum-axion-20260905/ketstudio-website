module.exports = {
  apps: [
    {
      name: "ketstudio-website",
      script: "npm",
      args: "run start -- --hostname 127.0.0.1 --port 3000",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
    },
  ],
};
