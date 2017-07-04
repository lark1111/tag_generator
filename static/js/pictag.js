/**
 * Created by airghc on 2017/4/10.
 */
 Vue.config.debug = true;// 开启vue 调试功能

    new Vue({
        el: '#app',
        data: {
            basic_info: [],
            image_info: [],
            image_size: [],
            canvas_width: 400,
            canvas_height: 200,
            target: 0,
            tag: '@'
        },
        methods: {
            addPic: function (e) {
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange: function (e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
            },
            // to2len: function (table) {
            //     var
            //
            // }
            createImage: function (file) {
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();
                var vm = this;
                var leng = file.length;
                var i = 0;
                var func = function(){
                    if(i>=leng){
                        return;
                    }
                    var info = {}
                    info.name = file[i].name
                    vm.basic_info.push(info)
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        image.src = e.target.result;
                        vm.image_info.push(e.target.result);
                        i++
                        // console.log(vm.basic_info, vm.image_info)
                        func()
                    };
                    reader.readAsDataURL(file[i]);
                }
                func()
                // for (var i=0; i<leng; i++) {
                //     var info = {};
                //     info.name = file[i].name;
                //     vm.basic_info.push(info);
                //     var reader = new FileReader();
                //     reader.readAsDataURL(file[i]);
                //     reader.onload = function (e) {
                //         image.src = e.target.result;
                //         vm.image_info.push(e.target.result);
                //     };
                // }
            },
            delImage: function (index) {
                this.image_info.splice(index, 1);
                this.basic_info.splice(index, 1);
                this.showcanvas(1)
            },
            removeImage: function (e) {
                this.image_info = [];
                this.basic_info = [];
                this.tag = '';
                this.target = 0;
                this.showcanvas(0);
            },
            startMark: function () {
                this.showcanvas(1)
            },
            showcanvas: function (type) {
                var vm = this
                // console.log( vm.target, vm.line_tags)
                if (vm.basic_info.length) {
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    var image = new Image();
                    canvas.height = vm.canvas_height;
                    canvas.width = vm.canvas_width;
                    image.src = vm.image_info[vm.target];
                    image.onload = function() {
                        context.drawImage(image, 0, 0, image.width*3, image.height*3)
                    }
                    if(type){
                         vm.fetchinfo(vm.basic_info[vm.target].name);
                    } else {
                        vm.showinfo()
                    }
                }
                else {
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    var image = new Image();
                    canvas.height = vm.canvas_height;
                    canvas.width = vm.canvas_width;
                    image.src = vm.image_info[vm.target];
                    image.onload = function() {
                        context.drawImage(image, 0, 0, image.width*3, image.height*3)
                    }
                    vm.showinfo()
                }
            },
            submittag: function(){
                var vm =this
                var tags = document.getElementById('input_tag').value;
                var info = {
                    'name': vm.basic_info[vm.target].name,
                    'tags': tags
                }
                var obj = JSON.stringify(info);

                $.ajax({
                type: 'post',
                url: "/pics/addmark",
                data: obj,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    if (data.status == 200) {
                        alert('提交成功！')
                        vm.showcanvas(1)
                    }
                },
                error: function (jqXHR) {
                    alert(JSON.stringify(jqXHR))
                }
            })
            },
            removetag: function(e){
                this.tag = '';
                this.showcanvas(0);
            },
            lastpic: function(){
                var vm = this;
                vm.tag = '@';
                if(vm.target >0) {
                    vm.target = vm.target -1;
                    vm.showcanvas(1);
                }
            },
            nextpic: function(){
                var vm = this
                vm.tag = '@';
                if(vm.target <vm.basic_info.length-1) {
                    vm.target = vm.target +1
                    vm.showcanvas(1)
                }
            },
            fetchinfo: function(name) {
                var vm =this;
                // console.log(name)
                var info = JSON.stringify({'name': name})
                console.log(name)
                $.ajax({
                    type: 'post',
                    url: "/pics/confirm",
                    data: info,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 200 && data.info) {
                            vm.tag = data.info.tags
                        }
                        vm.showinfo()
                        
                    },
                    error: function (jqXHR) {
                        alert(JSON.stringify(jqXHR))
                    }
                });
            },  
            showinfo: function() {
                document.getElementById('input_tag').value = this.tag;
            }

        }
    })