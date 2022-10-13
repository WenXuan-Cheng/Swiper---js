window.addEventListener('load', function () {
    // 点击箭头
    let left = document.querySelector('.iconl')
    let right = document.querySelector('.iconr')
    let ul = document.querySelector('ul')
    let ol = document.querySelector('ol')
    let swiper = document.querySelector('.containerBox')
    let swiperWidht = swiper.offsetWidth
    // 箭头的显示与隐藏
    swiper.addEventListener('mouseenter', function () {
        right.style.display = 'block'
        left.style.display = 'block'

    })
    swiper.addEventListener('mouseleave', function () {
        right.style.display = 'none'
        left.style.display = 'none'
    })
    // 循环图片数量生成小圆点
    for (let i = 0; i < ul.children.length; i++) {
        // 生成一个li 
        let li = document.createElement('li')
        // 给每一个li设置index
        li.setAttribute('index', i)
        // 添加到ol中
        ol.appendChild(li)
        // li 的点击事件
        li.addEventListener('click', function () {
            // 排他思想
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            // 给自己添加样式类active
            this.className = 'active'
            // 图片滚动
            let index = this.getAttribute('index')
            num = index
            circle = index
            ul.style.left = -(index * swiperWidht) + 'px'
        })
    }
    ol.children[0].className = 'active'

    // 点击右箭头切换轮播图
    let num = 0
    // 小圆点的index
    let circle = 0
    let flag = true
    right.addEventListener('click', () => {
        if (flag) {
            flag = false
            num++
            if (num == ul.children.length) {
                num = 0
                ul.style.left = 0
            }
            ul.style.left = -(num * swiperWidht) + 'px'
            if (ul.style.left == -(num * swiperWidht) + 'px') {
                flag = true
            }
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
    left.addEventListener('click', function () {
        num--;
        if (num < 0) {
            num = ul.children.length - 1
            ul.style.left = -num * swiperWidht + "px"
        }
        ul.style.left = -num * swiperWidht + "px"
        circle--
        if (circle < 0) {
            circle = ol.children.length - 1
        }
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'active'
    })

})