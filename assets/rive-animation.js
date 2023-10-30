function initializeRiveAnimation() {
  const r = new rive.Rive({
    src: "https://cdn.rive.app/animations/vehicles.riv", // Replace with the URL to your Rive animation file
    canvas: document.getElementById("riveCanvas"),
    autoplay: true,
    stateMachines: "bumpy",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
  });
}
