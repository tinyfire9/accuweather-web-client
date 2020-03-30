class DB {
    private readonly DB_NAME = 'aw-db';
    private readonly DB_VERSION = 1;
    private db: IDBDatabase = {} as IDBDatabase;

    public open() {
        let req = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
        return new Promise((resolve, reject) => {
            req.onerror = (event) => {
                console.log('Err connecting to db');
                console.log(event);
                reject();
            }
    
            req.onsuccess = (event: any) => {
                this.db = event.target.result as IDBDatabase;
                resolve();
            }
        });
    }

    public fetchData(url: string) {
        return this.open()
            .then(() => {
                let transaction = this.db.transaction([url], 'readonly');
                var objectStore = transaction.objectStore(url);
                return new Promise((resolve, reject) => {
                    let req = objectStore.getAll();
                    req.onsuccess = (event: any) => {
                        resolve(event.target.result);
                    };

                    req.onerror = (event: any) => {
                        console.log(`Error reading all from ${url}`);
                        console.log(event);
                        reject(event);
                    }
                })
            });
    }


    public storeData (url: string, data: any) {
        this.open()
            .then(() => {
                let transaction = this.db.transaction([url], 'readwrite');
                var objectStore = transaction.objectStore(url);
                var request = objectStore.add({ data });
                request.onerror = function(event: any) {
                    console.log('error storing data')
                    console.log(event)
                };
            });
    }
}

export { DB };