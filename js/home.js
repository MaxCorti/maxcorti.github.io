/* Home page: clicking the orb sends it flying to the top-left corner
   (where it becomes the persistent nav button on inner pages), then
   navigates to the projects page. */
(function () {
  const orb = document.getElementById("orb");
  const orbWrap = document.getElementById("orbWrap");
  if (!orb || !orbWrap) return;

  let launched = false;

  function launch() {
    if (launched) return;
    launched = true;
    orb.setAttribute("aria-disabled", "true");

    // The intro animation uses fill-mode `both`, and animated values beat
    // normal declarations — so it must be cleared before the flight, or
    // the wrap's transform never changes and the orb slides across at
    // full size. Reflow between the two class changes so the browser
    // registers the pinned start position and actually transitions.
    orbWrap.classList.add("flight-ready");
    void orbWrap.offsetWidth;
    orbWrap.classList.add("launching");

    const DESTINATION = "projects.html";
    const FALLBACK_DELAY = 1100;

    let navigated = false;
    function goToProjects() {
      if (navigated) return;
      navigated = true;
      window.location.href = DESTINATION;
    }

    // transitionend fires once per animated property (top, left, transform).
    // Wait for transform specifically — that's the one that finishes the
    // orb at its final size, so navigating on any earlier event would cut
    // the flight short.
    orbWrap.addEventListener("transitionend", function onEnd(e) {
      if (e.target !== orbWrap || e.propertyName !== "transform") return;
      orbWrap.removeEventListener("transitionend", onEnd);
      goToProjects();
    });
    setTimeout(goToProjects, FALLBACK_DELAY);
  }

  orb.addEventListener("click", launch);
  orb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      launch();
    }
  });
})();
