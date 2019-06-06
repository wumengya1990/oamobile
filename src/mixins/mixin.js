const mixni = {
    data() {
        return {
            backTopShow:false      //返回顶部按钮显示隐藏
        }
    },
    mounted() {
        
        //监听滚动条事件
        let zhumain = document.getElementsByClassName("listPage")[0];
        zhumain.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        // 向下滑动显示隐藏返回顶部按钮
        handleScroll(){
            let z = document.getElementsByClassName("listPage")[0];
            var t = z.scrollTop;
            if(t>200){
                this.backTopShow = true;
            }else{
                this.backTopShow = false;
            }
        }
    },
}

export default mixni;