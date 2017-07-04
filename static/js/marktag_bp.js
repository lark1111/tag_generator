/**
 * Created by airghc on 2017/6/28.
 */

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
            canvas_width: 1000,
            canvas_height: 80,
            target: 0,
            lines: [],
            tag: '',
            des: '',
            des_en: '',
            des_content: ''
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
                var i = 0
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
                //     reader.onload = function (e) {
                //         reader.readAsDataURL(file[i]);
                //         image.src = e.target.result;
                //         vm.image_info.push(e.target.result);
                //     };
                // }
            },
            delImage: function (index) {
                this.image_info.splice(index, 1);
                this.basic_info.splice(index, 1);
                // console.log(this.target, this.basic_info[this.target].name)
                this.showcanvas(1)
            },
            removeImage: function (e) {
                this.image_info = [];
                this.basic_info = [];
                this.lines = [];
                this.des = '';
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
                        context.drawImage(image, 0, 0, image.width*3, image.height*2)
                    }
                    if(type){
                         vm.fetchinfo(vm.basic_info[vm.target].name);
                    }
                    canvas.onmouseup = function (e) {
                        e.preventDefault()
                        var pointx = e.offsetX +2
                        // console.log(e.offsetX, e.offsetY)
                        //var point = vm.windowtocanvas(e.clientX, e.clientY)
                        // console.log(point)
                        vm.lines.push(pointx)
                        //line.end = point.x
                        // vm.line_tags.push(line)
                        vm.drawone(pointx)
                        // console.log(vm.line_tags)
                    };
                }
                else {
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    var image = new Image();
                    canvas.height = vm.canvas_height;
                    canvas.width = vm.canvas_width;
                    image.src = vm.image_info[vm.target];
                    image.onload = function() {
                        context.drawImage(image, 0, 0, image.width*3, image.height*2)
                    }
                    this.showinfo()
                }
            },
            windowtocanvas: function (x, y){
                var bbpx = canvas.getBoundingClientRect()
                return {x: x-bbpx.left, y: y-bbpx.top}
            },
            drawbuttom: function (lines){
                var vm = this
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                var i = 0
                while(i<vm.lines.length -1){
                    context.moveTo(lines[i], 80)
                    context.lineTo(lines[i+1], 80)
                    context.moveTo(lines[i], 0)
                    context.lineTo(lines[i+1], 0)
                    context.lineWidth = 2
                    context.strokeStyle = "rgb(187, 27, 57)"
                    context.stroke()
                    i = i+2
                }
            },
            drawtext: function (lines) {
                var vm = this
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                context.font = '20px serif'
                var i = 0
                while(i<vm.lines.length-1){
                    context.fillText(i/2, lines[i],20)
                    i=i+2
                }
            },
            drawlines: function(lines){
                var vm = this
                // console.log(this.line_tags)
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                // var lines = this.line_tags
                var i = 0
                while(i<vm.lines.length -1){
                    context.moveTo(lines[i], 0)
                    context.lineTo(lines[i], 80)
                    context.moveTo(lines[i+1], 0)
                    context.lineTo(lines[i+1], 80)
                    context.lineWidth = 1
                    context.strokeStyle = "rgb(187, 27, 57)"
                    context.stroke()
                    i = i+2
                }
                // for(var i =0;i< lines.length-1; i = i+2){
                //     // var end = line['end']
                //     context.moveTo(lines[i], 0)
                //     context.lineTo(lines[i], 80)
                //     context.lineWidth = 1
                //     context.strokeStyle = "rgb(187, 27, 57)"
                //     // context.stroke()
                //     context.moveTo(lines[i+1], 0)
                //     context.lineTo(lines[i+1], 80)
                //     context.lineWidth = 1
                //     context.strokeStyle = "rgb(31, 193, 21)"
                //     context.stroke()
                // }
            },
            drawone: function(line){
                var vm = this
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                context.moveTo(line, 0)
                context.lineTo(line, 80)
                context.lineWidth = 1
                context.strokeStyle = "rgb(236, 12, 87)"
                context.stroke()
            },
            submittag: function(){
                var vm =this
                var tag = document.getElementById('input_tag').value;
                var des = document.getElementById('input_des').value;
                var des_en = document.getElementById('input_des_en').value;
                var des_content = document.getElementById('input_des_content').value;
                var tags = []
                // console.log(vm.target, vm.basic_info[vm.target].name)
                // console.log(tag.split('_'))
                if(tag.split('_').length == (tag.length+1)/2){
                    tags = tag.split('_')
                } else {
                    tags = tag.split('')
                }
                // console.log(tag.length, vm.lines.length)
                if((tags.length*2) == vm.lines.length || tags.length ==0){
                // if(1){
                    var count = 0
                    // var line_tags = vm.line_tags
                    // console.log(tags,line_tags)
                    var real_line = []
                    // console.log(vm.lines)
                    for(var i in vm.lines){
                        // console.log(i)
                        var j = Math.round(vm.lines[i]/3)
                        real_line.push(j)
                        // console.log(real_line)
                    }
                    var info = {
                        'lines': real_line,
                        'name': vm.basic_info[vm.target].name,
                        'des': des,
                        'des_en': des_en,
                        'des_content': des_content,
                        'tags': tags
                    }
                    var obj = JSON.stringify(info);
                     $.ajax({
                    type: 'post',
                    url: "/mark/addmark",
                    data: obj,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 200) {
                            // alert('提交成功！')
                            vm.showcanvas(1)
                        }
                    },
                    error: function (jqXHR) {
                        alert(JSON.stringify(jqXHR))
                    }
                });
                }
                else {
                    console.log(tags.length, vm.lines.length)
                    alert('与标签线不符，请重新输入标签！')
                }
            },
            submitdes: function(){
                var vm =this
                var des = document.getElementById('input_des').value;
                var des_en = document.getElementById('input_des_en').value;
                var des_content = document.getElementById('input_des_content').value;
                var info = {
                    'name': vm.basic_info[vm.target].name,
                    'des': des,
                    'des_en': des_en,
                    'des_content': des_content
                }
                var obj = JSON.stringify(info);
                 $.ajax({
                type: 'post',
                url: "/mark/adddes",
                data: obj,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    if (data.status == 200) {
                        vm.showcanvas(1)
                        alert('提交成功！')
                    }
                },
                error: function (jqXHR) {
                    alert(JSON.stringify(jqXHR))
                }
                });
            },
            removetag: function(e){
                this.lines = [];
                this.tag = '';
                this.des = '';
                this.des_content = '';
                this.des_en = '';
                this.showcanvas(0);
                this.showinfo();
                // console.log(this.target, this.basic_info[this.target].name)
            },
            lastpic: function(){
                var vm = this;
                vm.tag = '';
                vm.des = '';
                vm.des_en = '';
                vm.des_content = '';
                vm.lines = [];
                if(vm.target >0) {
                    vm.target = vm.target -1;
                    // console.log(vm.target, vm.basic_info[vm.target].name)
                    vm.showcanvas(1);
                }

            },
            nextpic: function(){
                var vm = this
                vm.tag = '';
                vm.des = '';
                vm.des_en = '';
                vm.des_content = '';
                vm.lines = []
                if(vm.target <vm.basic_info.length-1) {
                    vm.target = vm.target +1
                    // console.log(vm.target, vm.basic_info[vm.target].name)
                    vm.showcanvas(1)
                }

            },
            rollback: function() {
                this.line_tags.pop()
                console.log(this.line_tags)
                var lines = this.line_tags
                this.drawlines([])
                //this.drawlines(this.line_tags)
            },
            fetchinfo: function(name) {
                var vm =this;
                // console.log(name)
                var info = JSON.stringify({'name': name})
                $.ajax({
                    type: 'post',
                    url: "/mark/confirm",
                    data: info,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 200) {
                            if(data.info.lines) {
                                var real_line = []
                                for (var i in data.info.lines) {
                                    // console.log(data.info.lines)
                                    var j = data.info.lines[i] * 3
                                    real_line.push(j)
                                    // console.log(real_line)
                                }
                                vm.lines = real_line
                                vm.tag = data.info.tags.join('_')
                            }
                            if(data.info){
                                vm.des = data.info.des
                                vm.des_en = data.info.des_en
                                vm.des_content = data.info.des_content
                                // console.log(vm.lines)
                            }
                            vm.drawlines(vm.lines)
                            vm.drawbuttom(vm.lines)
                            vm.drawtext(vm.lines)
                            vm.showinfo()
                        }
                    },
                    error: function (jqXHR) {
                        alert(JSON.stringify(jqXHR))
                    }
                });
            },
            showinfo: function() {
                document.getElementById('input_tag').value = this.tag;
                document.getElementById('input_des').value = this.des;
                document.getElementById('input_des_en').value = this.des_en;
                document.getElementById('input_des_content').value = this.des_content;
            },
            reviewtag: function(){
                var vm =this
                vm.drawlines(vm.lines)
                vm.drawbuttom(vm.lines)
                vm.drawtext(vm.lines)
                vm.showinfo()
}

        }
    })