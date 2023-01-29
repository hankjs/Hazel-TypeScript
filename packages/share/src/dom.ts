export function listenElementRemove(el: Element, listener: () => void) {
    const config = { attributes: false, childList: true, subtree: false };

    const callback = (mutationList: MutationRecord[]) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                let isRemove = false;
                mutation.removedNodes.forEach((node) => {
                    if (node === el) {
                        isRemove = true;
                    }
                });
                if (isRemove) {
                    listener();
                    observer.disconnect();
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(el.parentElement!, config);
}
