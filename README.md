## 気合 Kiai

気合 Kiai is built for studying [go](https://en.wikipedia.org/wiki/Go_(game)) games.

### Development
<details>
  <summary>Debug in VS Code</summary>

  `.vscode/launch`
  ```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Electron: Main",
            "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
            "runtimeArgs": [
                "--remote-debugging-port=9223",
                "."
            ],
            "windows": {
                "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
            }
        },
        {
            "name": "Electron: Renderer",
            "type": "chrome",
            "request": "attach",
            "port": 9223,
            "webRoot": "${workspaceFolder}",
            "timeout": 30000
        }
    ],
    "compounds": [
        {
            "name": "Electron: All",
            "configurations": [
                "Electron: Main",
                "Electron: Renderer"
            ]
        }
    ]
}
  ```
</details>

## Copyright

&copy; 2022 [horaceho.com](https://horaceho.com)
