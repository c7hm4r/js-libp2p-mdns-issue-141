# js-libp2p-mdns-issue-141

Run following:

```shell
yarn
yarn run demo
```

or

```shell
docker build . -t js-libp2p-mdns-issue-141
docker run -it --rm js-libp2p-mdns-issue-141:latest
```

Then the bug is that neither the `peer:discovery`
nor the `peer` event are emitted.
