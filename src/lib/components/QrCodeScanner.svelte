<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Html5QrcodeScanner,
    type Html5QrcodeResult,
    Html5QrcodeScanType,
    Html5QrcodeSupportedFormats,
    Html5QrcodeScannerState
  } from 'html5-qrcode';

  let { scanSuccess, scanFailure, class: klass, width, height, paused = false } = $props();

  let scanner: Html5QrcodeScanner;
  onMount(() => {
    scanner = new Html5QrcodeScanner(
      'qr-scanner',
      {
        fps: 10,
        qrbox: { width, height },
        aspectRatio: 1,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
          Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.CODABAR
        ]
      },
      false
    );
    scanner.render(scanSuccess, scanFailure);
  });

  let togglePause = $derived.by((paused: boolean) => {
    if (paused && scanner?.getState() === Html5QrcodeScannerState.SCANNING) {
      scanner?.pause();
    } else if (scanner?.getState() === Html5QrcodeScannerState.PAUSED) {
      scanner?.resume();
    }
  });
</script>

<div id="qr-scanner" class={klass}></div>

<style>
  #qr-scanner {
    background-color: transparent;

    height: 240px;

    border: 0 solid #000 !important;
  }

  /* Hide unwanted icons */
  #qr-scanner :global(img[alt='Info icon']),
  #qr-scanner :global(img[alt='Camera based scan']) {
    display: none;
  }

  /* Change camera permission button text */
  #qr-scanner :global(#html5-qrcode-button-camera-permission) {
    visibility: hidden;
  }
  #qr-scanner :global(#html5-qrcode-button-camera-permission::after) {
    position: absolute;
    inset: 0 0 auto;
    display: block;
    content: 'Allow camera access';
    visibility: visible;
    padding: 10px 0;

    background-color: rgb(153, 27, 27);
    color: white;
    border-radius: 8px;

    font-size: 14px;
    font-weight: 600;
  }
</style>
