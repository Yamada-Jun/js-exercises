import threads from 'worker_threads';

if (threads.isMainThread) {
    let num = 0;
    let worker = new threads.Worker(new URL(import.meta.url));

    worker.on("online", () => {
        for(let i = 0; i < 10_000_000; i++) {
            num++;
        }
        worker.on("message", (message) => {
            //addというメッセージがきたらnumをインクリメントする
            if (message === "add") {
                num++;
            } else if (message === "done") {
                console.log(num);
            }
        });
    });
} else {
    for(let i = 0; i < 10_000_000; i++) {
        threads.parentPort.postMessage("add");
    }
    threads.parentPort.postMessage("done");
}
