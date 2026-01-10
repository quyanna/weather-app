let active = null;
let idle = null;

export function initBackgroundVideo() {
  const bgA = document.getElementById("videoA");
  const bgB = document.getElementById("videoB");

  if (!bgA || !bgB) {
    throw new Error(
      "Background videos not found. Check IDs videoA/videoB in HTML."
    );
  }

  active = bgA;
  idle = bgB;
}

function waitForCanPlay(videoEl) {
  return new Promise((resolve) => {
    if (videoEl.readyState >= 3) return resolve(); // HAVE_FUTURE_DATA
    videoEl.addEventListener("canplay", resolve, { once: true });
  });
}

export async function crossFadeTo(srcUrl, { fadeMs = 600 } = {}) {
  //if already showing this exact file, do nothing
  if (active.currentSrc && active.currentSrc.endsWith(srcUrl.split("/").pop()))
    return;

  // load in the new video
  idle.pause();
  idle.src = srcUrl;
  idle.load();

  //wait until video can actually play so we don't fade to black or something
  await waitForCanPlay(idle);

  try {
    await idle.play();
  } catch (error) {
    // this shouldn't happen because waitForCanPlay
    console.error("Error playing background video: " + error);
    idle.pause();
  }

  //crossfade videos
  idle.classList.add("is-active");
  active.classList.remove("is-active");

  //After fade completes, pause the old one to save CPU and swap references to idle and active videos

  window.setTimeout(() => {
    active.pause();
    const temp = active;
    active = idle;
    idle = temp;
  }, fadeMs + 50);
}
