// 给定初始化值
const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObj = JSON.parse(x);
const hashMap = xObj || [
  {
    logo: "G",
    url: "https://github.com",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "Y",
    url: "https://www.yuque.com",
  },
];

const removeX = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 正则表达式，删除 / 开头以后所有内容
};

const render = () => {
  $(".siteList").find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
           <div class="logo">${node.logo[0]}</div>
           <div class="link">${removeX(node.url)}</div>
           <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
           </div>
        </div>
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url); // 使用a标签没有办法阻止冒泡
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: removeX(url)[0],
    url: url,
  });
  render();
});

// 保存数据在本地存储 x 里
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
$(document).on("keypress", ".globalHeader", (e) => {
  e.stopPropagation(); // 阻止 keypress 在 input 输入框起作用
});
