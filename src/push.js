import CONFIG from "./scripts/config";
const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js");
      console.log("Service Worker registered");
      if (registration.installing) {
        await waitUntilActivated(registration.installing);
      } else if (registration.waiting) {
        await waitUntilActivated(registration.waiting);
      } else if (registration.active) {
      }
      await subscribeUserToPush(registration);
    } catch (error) {
      console.error("SW registration or subscription failed:", error);
    }
  } else {
    console.warn("Push messaging is not supported");
  }
}
function waitUntilActivated(worker) {
  return new Promise((resolve) => {
    worker.addEventListener("statechange", function () {
      if (worker.state === "activated") {
        resolve();
      }
    });
  });
}

async function subscribeUserToPush(registration) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const filteredSubscription = {
    endpoint: subscription.endpoint,
    keys: subscription.toJSON().keys,
  };

  const token = localStorage.getItem("token");
  const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredSubscription),
  });

  const result = await response.json();
  console.log("Subscribed:", result);
}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export { subscribeUserToPush };
