//      
// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型

//  - User: { id: number, name: string }
// Tuple
                                                       
               
                 
  

//  - Task: { title: string, completed: boolean, user: User }
                                          
                  
                       
               
  

//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
                                          

//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型
                                                  

// Userオブジェクトであることを判定する
function isUserObject(obj     ) {// objは様々な型をとるのでanyとする
    return (
        typeof obj === "object" &&
        typeof obj["id"] === "number" &&
        typeof obj["name"] === "string"
    );
}

export class TaskManager                 { //TはTask型またはTask型を拡張した型を指定
    _tasks      = [];

    // タスクを追加する
    add(task   ) {
        this._tasks.push(task);
    }

    // タスクを完了にする
    // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
    // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
    completeTask(target               ) {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)   // <T extends Task>としたので、型推論によりt.userと書ける
                .forEach((t) => (t.completed = true));// <T extends Task>としたので、型推論によりt.completedと書ける
        } else {
            this._tasks
                .filter((t) => t.title === target)  // <T extends Task>としたので、型推論によりt.titleと書ける
                .forEach((t) => (t.completed = true));
        }
    }

    // 引数の関数にマッチするタスクを返す
    // 引数を省略した場合はすべてのタスクを返す
    getTasks(predicate                       )           {//predicateはundefinedまたはT型のタスクを引数にとりbooleanを返す関数.Flowでは戻り値の型指定: Array<T>が必要
        if (predicate === undefined) {
            return this._tasks;
        } else {
            return this._tasks.filter(predicate);
        }
    }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask              )          {//Flowでは戻り値の型指定: booleanが必要
    return priorityTask.priority === "low" || priorityTask.completed;//priorityTask: PriorityTaskとしたので、型推論によりpriorityTask.priority .completedと書ける
}

// 判定関数の否定結果を返す関数を生成する
export function not   (f                     )                      {//fにisLowOrCompletedTaskが入ることになる。T型を引数にとりbooleanを返す関数.Flowでは戻り値の型指定: (arg: T) => booleanが必要
    return (arg   ) => !f(arg);
}
