function animateLow(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        // 缓动原理，移动的距离越来越小
        // 移动距离=（目标距离-当前移动距离）/10
        var move=(target-obj.offsetLeft)/10;
        // 移动距离取整，往大的方向取
        // 移动距离为负数，往小的方向取
        move=move>=0 ? Math.ceil(move) : Math.floor(move);
        obj.style.left=obj.offsetLeft+move+'px';

        // 停止
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);

            // 定时器的任务执行完毕后
            // 执行回调函数
            if(callback){
                callback();
            }
            
        }
    },15);
}
