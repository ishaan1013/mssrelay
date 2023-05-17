import { useEffect, useRef, useState } from "react";

import banner from "./assets/banner.png";
import map0 from "./assets/maps/map0.png";
import map1 from "./assets/maps/map1.png";
import map2 from "./assets/maps/map2.png";
import map3 from "./assets/maps/map3.png";
import { Focus } from "lucide-react";
import { useMediaDevices } from "@yudiel/react-qr-scanner";
import "./index.css";
import ScannerModal from "./components/scannerModal";
import Notification from "./components/toast";
import ResetModal from "./components/resetModal";
import dates from "./utils/dates";

export default function Home() {
  const [scanned, setScanned] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedScans = localStorage.getItem("scanned");
    if (storedScans === null) {
      localStorage.setItem("scanned", "0");
      setScanned(0);
    } else {
      setScanned(parseInt(storedScans));
    }
  }, []);

  const bannerRef = useRef<HTMLImageElement>(null);
  const map0Ref = useRef<HTMLImageElement>(null);
  const map1Ref = useRef<HTMLImageElement>(null);
  const map2Ref = useRef<HTMLImageElement>(null);
  const map3Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bannerRef.current) bannerRef.current.src = banner;
    if (map0Ref.current) map0Ref.current.src = map0;
    if (map1Ref.current) map1Ref.current.src = map1;
    if (map2Ref.current) map2Ref.current.src = map2;
    if (map3Ref.current) map3Ref.current.src = map3;
  }, []);

  const cams = useMediaDevices();

  const timerRef = useRef(0);
  const [toasted, setToasted] = useState(false);
  const [message, setMessage] = useState("");

  const onSuccess = () => {
    const newScanned = scanned + 1;
    localStorage.setItem("scanned", newScanned.toString());
    setScanned(newScanned);

    localStorage.setItem("lastScan", Date.now().toString());

    setToasted(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToasted(true);
      setMessage("Scan successful! 🚀");
    }, 100);
  };

  const onFailure = () => {
    setToasted(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToasted(true);
      setMessage("Wrong code, follow the map! 🤦‍♂️");
    }, 100);
  };

  const onTooFast = () => {
    setToasted(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToasted(true);
      setMessage("You're a little too fast (or cheating)! 🙅‍♀️");
    }, 100);
  };

  const [begun, setBegun] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setBegun(Date.now() > new Date(dates.start).getTime());
    setEnded(Date.now() > new Date(dates.end).getTime());

    return () => clearTimeout(timerRef.current);
  }, []);

  const progress =
    scanned > 40
      ? "100%"
      : scanned === 0
      ? "2%"
      : Math.round((scanned / 36) * 100) + "%";

  const confirmReset = () => {
    localStorage.setItem("scanned", "0");
    setScanned(0);

    setToasted(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToasted(true);
      setMessage("Progress reset. 🔁");
    }, 100);
  };

  const [resetOpen, setResetOpen] = useState(false);

  if (!begun) {
    return (
      <main className="flex min-h-screen overflow-x-hidden w-screen items-center justify-center flex-col p-6 xs:p-8 ">
        <div className="font-semibold">This themed lap begins at 4:00PM ⌚</div>
        <a
          href="https://www.instagram.com/mssrelayforlife/"
          about="_blank"
          rel="noreferrer"
          className="text-yellow-500 font-medium mt-3"
        >
          @mssrelayforlife
        </a>
      </main>
    );
  }

  if (ended) {
    return (
      <main className="flex min-h-screen overflow-x-hidden w-screen items-center justify-center flex-col p-6 xs:p-8 ">
        <div className="px-8 py-6 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
          <div className="text-4xl font-semibold text-yellow-500">
            {scanned ? scanned : 0}
          </div>
          <div className="text-base font-medium">Scanned</div>
        </div>
        <div className="font-semibold mt-6 text-center">
          This themed lap has now ended. Show this to MAC to claim your team's
          rewards! 🎉
        </div>
        <a
          href="https://www.instagram.com/mssrelayforlife/"
          about="_blank"
          rel="noreferrer"
          className="text-yellow-500 font-medium mt-3"
        >
          @mssrelayforlife
        </a>
      </main>
    );
  }

  return (
    <>
      <div>
        {JSON.stringify(begun)} {JSON.stringify(ended)}
      </div>
      <Notification
        message={message}
        toasted={toasted}
        setToasted={setToasted}
      />
      <ScannerModal
        open={open}
        setOpen={setOpen}
        scanned={scanned}
        onSuccess={onSuccess}
        onFailure={onFailure}
        onTooFast={onTooFast}
        cams={cams}
      />
      <ResetModal
        open={resetOpen}
        setOpen={setResetOpen}
        confirmReset={confirmReset}
      />
      <main className="flex min-h-screen overflow-x-hidden w-screen items-start justify-center p-6 xs:p-8 ">
        <div className="w-full max-w-screen-xs h-full">
          <div className="w-full rounded-lg overflow-hidden flex items-center relative bg-cover h-36 bg-blue-800">
            <img
              className="min-w-full object-cover min-h-full"
              alt="Relay for life logo banner"
              ref={bannerRef}
              loading="eager"
            />
          </div>
          {/* <div>{JSON.stringify(cams)}</div> */}
          <div className="mt-4 w-full grid grid-cols-2 gap-4">
            <button
              onClick={() => setOpen(true)}
              className="h-28 w-full flex-col flex items-center justify-center rounded-lg bg-blue-800 transition-all hover:opacity-80"
            >
              <Focus className="w-10 h-10" />
              <div className="text-base font-medium mt-1">Scan QR</div>
            </button>
            <div className="h-28 w-full rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
              <div className="text-4xl font-semibold text-yellow-500">
                {scanned}
              </div>
              <div className="text-base font-medium">Scanned</div>
            </div>
          </div>
          <div className="mt-8 font-semibold text-lg text-center w-full">
            Rewards
          </div>
          <div className="rounded-full w-full mt-2 h-3 overflow-hidden bg-neutral-900 border border-neutral-800 relative">
            <div
              style={{ width: progress }}
              className="rounded-full absolute h-full bg-yellow-500"
            ></div>
          </div>
          <div className="mt-1 w-full flex items-center justify-between px-1.5">
            <div className="font-medium text-base text-yellow-500">0&nbsp;</div>
            <div
              style={scanned >= 12 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base"
            >
              12
            </div>
            <div
              style={scanned >= 24 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base"
            >
              24
            </div>
            <div
              style={scanned >= 36 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base"
            >
              36
            </div>
          </div>
          <div className="mt-3 space-y-1 flex flex-col justify-start">
            <div
              style={scanned >= 12 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base flex items-center"
            >
              12 <Focus className="w-5 h-5 ml-0.5 mr-2" />{" "}
              <span className="text-white">+1 Raffle Ticket</span>
            </div>
            <div
              style={scanned >= 24 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base flex items-center"
            >
              24 <Focus className="w-5 h-5 ml-0.5 mr-2" />{" "}
              <span className="text-white">Free Candy</span>
            </div>
            <div
              style={scanned >= 36 ? { color: "#eab308" } : { opacity: 0.3 }}
              className="font-medium text-base flex items-center"
            >
              36 <Focus className="w-5 h-5 ml-0.5 mr-2" />{" "}
              <span className="text-white">+2 Raffle Tickets</span>
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-cover flex items-center justify-center relative mt-8 h-48 bg-green-800">
            <img
              style={{ display: scanned % 4 === 0 ? "block" : "none" }}
              className="min-w-full object-cover min-h-full"
              alt="Map showing the target QR code: ..."
              ref={map0Ref}
              loading="eager"
            />
            <img
              style={{ display: scanned % 4 === 1 ? "block" : "none" }}
              className="min-w-full object-cover min-h-full"
              alt="Map showing the target QR code: ..."
              ref={map1Ref}
              loading="eager"
            />
            <img
              style={{ display: scanned % 4 === 2 ? "block" : "none" }}
              className="min-w-full object-cover min-h-full"
              alt="Map showing the target QR code: ..."
              ref={map2Ref}
              loading="eager"
            />
            <img
              style={{ display: scanned % 4 === 3 ? "block" : "none" }}
              className="min-w-full object-cover min-h-full"
              alt="Map showing the target QR code: ..."
              ref={map3Ref}
              loading="eager"
            />
          </div>
          <button
            onClick={() => setResetOpen(true)}
            className="w-full text-center mt-8 text-base font-medium opacity-30 transition-all hover:opacity-[0.15]"
          >
            Reset Data
          </button>
        </div>
      </main>
    </>
  );
}
