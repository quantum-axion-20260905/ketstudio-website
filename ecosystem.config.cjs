module.exports = {
  apps: [
    {
      name: "ketstudio-website",
      script: "npm",
      args: "run start -- --hostname 0.0.0.0 --port 3010",
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
