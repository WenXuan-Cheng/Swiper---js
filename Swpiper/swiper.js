window.addEventListener('load', function () {
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let swiper = document.querySelector('.swiper')
    let swiperwidht = swiper.offsetWidth
    swiper.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
    })
    swiper.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(() => {
            arrow_r.click()
        }, 3000)
    })

    // 动态生成小圆点
    // 获取图片的个数
    // 获取父元素为swiper内部所有指定的标签名的子元素
    let ul = swiper.querySelector('ul')
    let ol = swiper.querySelector('ol')
    console.log(ul.children.length);
    for (let i = 0; i < ul.children.length; i++) {
        let li = this.document.createElement('li')
        // 将创建的li放到ol里面
        ol.appendChild(li)
        li.setAttribute('index', i)
        // 生成的li添加点击事件
        li.addEventListener('click', function () {
            // 排他思想
            // 清除active类
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            // 自己添加 active class
            this.className = 'active'

            console.log(swiperwidht);
            let index = this.getAttribute('index')
            num = index
            circle = index
            console.log(index);
            animation(ul, -index * swiperwidht)
        })
    }
    // ol的第一个孩纸添加active类名
    ol.children[0].className = 'active'

    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    // 点击按钮事件
    let num = 0
    // 小圆圈的播放
    let circle = 0
    // 节流阀
    let flag = true
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false
            num++
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            animation(ul, -num * swiperwidht, function () {
                flag = true
            })

            circle++;
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            if (circle == ol.children.length) {
                circle = 0
            }
            ol.children[circle].className = 'active'
        }
    })

    arrow_l.addEventListener('click', function () {

        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * swiperwidht + 'px'
            }
            num--
            animation(ul, -num * swiperwidht, function () {
                flag = true
            })

            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }

            ol.children[circle].className = 'active'
        }

    })

    //自动播放
    let timer = setInterval(() => { arrow_r.click() }, 3000)
})

function animation(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
        let step = Math.ceil(target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            if (callback) {
                callback()
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 30)

}