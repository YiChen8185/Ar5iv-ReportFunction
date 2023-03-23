document.addEventListener("DOMContentLoaded", () => {
  const reportBtn = document.querySelector(".report-btn");
  const content = document.querySelector(".content");
  let reportBox;
  let closeBtn;
  let textReport;

  reportBtn.addEventListener("click", () => {
      createReportBox();
  });

  document.onselectionchange = function () {
      const selectedText = window.getSelection();
      if (selectedText.toString().trim()) {
        // Remove any previous report buttons
        const previousButtons = document.querySelectorAll("button[id='small-report-button']");
        for (const button of previousButtons) {
          button.remove();
        }
    
        // Determine the position of the selected text
        const range = selectedText.getRangeAt(0);
        const rect = range.getBoundingClientRect();
    
        // Show the report button
        const smallReportButton = document.createElement("button");
        smallReportButton.id = "small-report-button";
        smallReportButton.innerHTML = "Report";
        smallReportButton.style.position = "fixed";
        smallReportButton.style.left = `${rect.left + rect.width / 2}px`;
    
        // Check if there is enough space above the selected text
        if (rect.top > 40) {
          smallReportButton.style.top = `${rect.top}px`;
          smallReportButton.style.transform = "translate(-50%, -100%)";
        } else {
          smallReportButton.style.top = `${rect.top}px`;
          smallReportButton.style.transform = "translate(-50%, 100%)";
        }
    
        document.body.appendChild(smallReportButton);
    
        // Handle the report button click event
        smallReportButton.addEventListener("click", function () {
          createReportBox();
          smallReportButton.remove();
        });
      } else {
        // Remove the report button
        const smallReportButton = document.querySelector("button[id='small-report-button']");
        if (smallReportButton) {
          smallReportButton.remove();
        }
      }
    };
    
    // Rest of the code remains the same (createReportBox, closeReportBox, takeScreenshot)
    

  document.addEventListener("keydown", (e) => {
      if (e.key === "s") {
      createReportBox();
      } else if (e.key === "c") {
      closeReportBox();
      }
  });

    

  function createReportBox(x = null, y = null) {
    if (!reportBox) {
      reportBox = document.createElement("div");
      reportBox.classList.add("report-box");

      closeBtn = document.createElement("span");
      closeBtn.textContent = "x";
      closeBtn.classList.add("close-btn");

      textReport = document.createElement("textarea");
      textReport.classList.add("text-report");

      const takeScreenshotBtn = document.createElement("button");
      takeScreenshotBtn.textContent = "Take Screenshot";
      takeScreenshotBtn.classList.add("take-screenshot");
      takeScreenshotBtn.addEventListener("click", takeScreenshot);

      reportBox.appendChild(closeBtn);
      reportBox.appendChild(textReport);
      reportBox.appendChild(takeScreenshotBtn);
      document.body.appendChild(reportBox);

      closeBtn.addEventListener("click", closeReportBox);
    }

    if (x !== null && y !== null) {
      reportBox.style.left = `${x}px`;
      reportBox.style.top = `${y}px`;
      reportBox.style.transform = "none";
    } else {
      reportBox.style.left = "";
      reportBox.style.top = "50%";
      reportBox.style.transform = "translateY(-50%)";
    }
    
    reportBox.style.display = "block";
  }

  function closeReportBox() {
      if (reportBox) {
      reportBox.style.display = "none";
      }
  }
  function takeScreenshot() {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
    
      html2canvas(document.body, {
        width: viewportWidth,
        height: viewportHeight,
        scrollX: -scrollX,
        scrollY: -scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      }).then((canvas) => {
        const img = document.createElement("img");
        img.id = "screenshot";
        img.src = canvas.toDataURL();
        img.style.position = "fixed";
        img.style.zIndex = "-1"; // Hide the image from the user's view
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.maxWidth = "none";
        img.style.maxHeight = "none";
        document.body.appendChild(img);
    
        const a = document.createElement("a");
        a.href = img.src;
        a.download = "screenshot.png";
        a.click();
    
        // Remove the image from the DOM after the download is triggered
        setTimeout(() => {
          img.remove();
        }, 100);
      });
  }
    
});          