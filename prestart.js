const { exec } = require("child_process");
const os = require("os");

function killPort3000() {
  if (os.platform() === "darwin" || os.platform() === "linux") {
    // MacOS hoặc Linux
    exec("lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9 || true", (error, stdout, stderr) => {
      if (error) {
        console.error(`Lỗi khi dừng cổng 3000 trên macOS/Linux: ${error}`);
        return;
      }
      console.log("Đã dừng ứng dụng trên cổng 3000 (macOS/Linux).");
    });
  } else if (os.platform() === "win32") {
    // Windows
    exec('netstat -aon | findstr "3000"', (error, stdout, stderr) => {
      if (error) {
        console.error(`Lỗi khi tìm kiếm cổng 3000 trên Windows: ${error}`);
        return;
      }
      const lines = stdout.trim().split("\n");
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1]; // PID là giá trị cuối
        exec(`taskkill /F /PID ${pid}`, (killError, killStdout, killStderr) => {
          if (killError) {
            console.error(`Lỗi khi dừng tiến trình trên cổng 3000: ${killError}`);
            return;
          }
          console.log(`Đã dừng ứng dụng trên cổng 3000 (Windows), PID: ${pid}.`);
        });
      });
    });
  } else {
    console.log("Đã dừng ứng dụng trên cổng 3000 (Windows), PID: ${pid}.");
  }
}

killPort3000();
