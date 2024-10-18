(function () {
  let throttle = function (type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");
})();

function init() {
  const topButton = document.querySelector("#btn_top");
  const botButton = document.querySelector("#btn_bottom");
  const topTable = document.querySelector("#table_top");
  const botTable = document.querySelector("#table_bottom");
  const mobileStyle = "mobile";
  const desktopStyle = "desktop";

  let currentLayout = window.innerWidth > 849 ? desktopStyle : mobileStyle;
  currentLayout === desktopStyle
    ? replaceTablePreview(desktopStyle)
    : replaceTablePreview(mobileStyle);

  function replaceTablePreview(toLayout) {
    const mainContainer = document.querySelector(".container");
    const tablePreviewSection = document.querySelector(".table_preview");
    const tableDescriptonSection = document.querySelector(".table_description");
    const secondParagraph = document.querySelector("#second_paragraph");

    if (toLayout === "desktop") {
      mainContainer.insertBefore(tablePreviewSection, tableDescriptonSection);
      currentLayout = "desktop";
    } else if (toLayout === "mobile") {
      tableDescriptonSection.insertBefore(tablePreviewSection, secondParagraph);
      currentLayout = "mobile";
    }
  }

  window.addEventListener("optimizedResize", () => {
    if (window.innerWidth < 849) {
      if (currentLayout === mobileStyle) return;
      else {
        replaceTablePreview(mobileStyle, currentLayout);
      }
    } else if (window.innerWidth >= 850) {
      if (currentLayout === desktopStyle) return;
      else {
        replaceTablePreview(desktopStyle, currentLayout);
      }
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === topButton) {
      topTable.className = "table_img top_opened";
      botTable.className = "table_img bot_opened";
    }

    if (e.target === botButton) {
      topTable.className = "table_img";
      botTable.className = "table_img";
    }
  });
}

window.onload = init();
