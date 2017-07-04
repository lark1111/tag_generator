/**
 * Created by airghc on 2017/4/9.
 */
 Vue.config.debug = true;// 开启vue 调试功能
    new Vue({
        el: '#app',
        data: {
            basic_info: [],
            image_info: []
        },
        methods: {
            addPic: function(e) {
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
            },
            createImage: function(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var info = {};
                    info.size = file[i].size;
                    info.type = file[i].type;
                    info.name = file[i].name;
                    info.lastmodified = file[i].lastModified;
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        image.src = e.target.result;
                        image.onload = function() {
                            info.width = image.width;
                            info.height = image.height;
                        };
                        vm.image_info.push(e.target.result);
                        vm.basic_info.push(info);
                    };
                }
            },
            delImage:function(index){
                console.log(index)
                this.image_info.pop(index);
                this.basic_info.pop(index);
            },
            removeImage: function(e) {
                this.image_info = [];
                this.basic_info = [];
            },
            uploadImage: function() {
                var vm =this
                var obj = JSON.stringify(this.basic_info);
                console.log(obj)
                $.ajax({
                    type: 'post',
                    url: "/tag/upload",
                    data: obj,
                    contentType: "application/json",
                    dataType: "json",
                    success: function(data) {
                        if(data.status == 200) {
                            alert("上传成功！")
                            vm.removeImage()
                        }
                    },
                    error: function(jqXHR) {
                        alert(JSON.stringify(jqXHR))
                    }
                });
            }
        }
    })