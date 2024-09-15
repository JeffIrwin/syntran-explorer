
# syntran-explorer

A website where you can run syntran in the browser

Currently live, hosted on AWS at https://jeffirwin.xyz/syntran 

## One-time setup
```bash
npm install
./install-syntran.sh
```

The script `install-syntran.sh` will install syntran if you don't have it, or update to the latest released version

## Run server

Staging in foreground:
```bash
./start.sh --stg
```

Production in background:
```bash
nohup ./start.sh &
```

