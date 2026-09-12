import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  Camera,
  Check,
  ChevronRight,
  CircleDot,
  Download,
  Hand,
  Laptop,
  Menu,
  Network,
  Plus,
  Radio,
  Send,
  Sparkles,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HAND NOTIFY — Gesture Notifications" },
      {
        name: "description",
        content: "Control your friend's mouse over the local network using hand gestures.",
      },
      { property: "og:title", content: "HAND NOTIFY — Gesture Notifications" },
      {
        property: "og:description",
        content: "Control their mouse with your hands. No typing, no clicking, just move.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HandNotify,
});

const navItems = [
  ["Home", "top"],
  ["How It Works", "how-it-works"],
  ["Gestures", "gestures"],
  ["Friends", "friends"],
] as const;

const joints = [
  [50, 84], [39, 73], [30, 61], [22, 49], [16, 38],
  [45, 60], [42, 43], [41, 28], [41, 14],
  [54, 58], [55, 39], [56, 22], [57, 8],
  [63, 62], [68, 45], [72, 31], [75, 19],
  [70, 69], [79, 59], [85, 50], [90, 43],
] as const;

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15],
  [15, 16], [0, 17], [17, 18], [18, 19], [19, 20], [5, 9], [9, 13], [13, 17],
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="HAND NOTIFY home">
      <span className="grid size-9 place-items-center rounded-md bg-foreground text-background">
        <Hand size={17} strokeWidth={2.2} />
      </span>
      <span className="font-display text-lg font-semibold text-foreground">HAND NOTIFY</span>
      <span className="hidden border-l border-border pl-3 font-mono text-[10px] uppercase text-muted-foreground sm:block">v0.4 · local</span>
    </a>
  );
}

function Dot({ muted = false }: { muted?: boolean }) {
  return <span className={`size-2 shrink-0 rounded-full ${muted ? "bg-foreground/20" : "signal-dot bg-primary"}`} />;
}

function HandSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={compact ? "h-20 w-20" : "h-full w-full"} aria-label="Animated 21-point hand landmark skeleton">
      {connections.map(([a, b], i) => (
        <line key={i} x1={joints[a][0]} y1={joints[a][1]} x2={joints[b][0]} y2={joints[b][1]} className="landmark-line" />
      ))}
      {joints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 2.1 : 1.55} className="landmark-point" style={{ animationDelay: `${i * 55}ms` }} />
      ))}
    </svg>
  );
}

function HeroDiagram() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-3xl bg-secondary p-5 sm:p-7">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground">
        <span>Fig. 01 — Hand → signal → receipt</span>
        <span className="flex items-center gap-2 text-primary"><Dot /> Signal live</span>
      </div>
      <div className="relative mt-7 h-[325px]">
        <div className="absolute left-0 top-24 z-10 w-[42%] max-w-56 rounded-2xl border border-border bg-background p-3 shadow-panel sm:left-4 sm:top-28">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase text-muted-foreground"><span>Your PC</span><Camera size={13} /></div>
          <div className="mt-3 aspect-[4/3] rounded-xl bg-foreground p-3"><HandSkeleton /></div>
          <div className="mt-2 flex justify-between font-mono text-[9px]"><span>Gesture · WAVE</span><span className="text-primary">97%</span></div>
        </div>
        <div className="absolute right-0 top-14 z-10 w-[42%] max-w-56 rounded-2xl border border-border bg-background p-3 shadow-panel sm:right-4 sm:top-20">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase text-muted-foreground"><span>Friend's PC</span><Laptop size={13} /></div>
          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl bg-foreground p-3">
            <div className="notification-in absolute inset-x-3 bottom-3 rounded-lg bg-background p-3 shadow-panel">
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase text-primary"><Activity size={11} /> Remote Mouse</div>
              <p className="mt-1 text-[10px] font-semibold text-foreground">Your mouse is being controlled remotely.</p>
            </div>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px]"><span>192.168.1.14</span><span className="text-primary">RECEIVED</span></div>
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 325" preserveAspectRatio="none" aria-hidden="true">
          <path d="M145 210 C 280 45, 430 35, 560 155" className="network-path" />
        </svg>
        <span className="signal-packet absolute size-3 rounded-full bg-primary shadow-signal" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-background/80 px-3 py-2 text-center font-mono text-[9px] uppercase leading-5 text-muted-foreground backdrop-blur-sm">
          Hand detected <ChevronRight className="inline size-3 text-primary" /> Hand position tracked <ChevronRight className="inline size-3 text-primary" /> Mouse cursor moves
        </div>
      </div>
    </div>
  );
}

function HandNotify() {
  const [toast, setToast] = useState("Ready to send");
  const [activity, setActivity] = useState("08:42 · Hand moved — mouse cursor moved");
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Your hand has something to say.",
    "Their cursor is suddenly possessed.",
    "Move your hand. Their mouse moves.",
    "Mice are overrated.",
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setMessageIndex((value) => (value + 1) % messages.length), 4500);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  const notify = (device = "Friend's Laptop") => {
    setToast(`Mouse control sent to ${device}`);
    setActivity(`Now · Hand moved — controlled ${device}`);
    window.setTimeout(() => setToast("Ready to send"), 2800);
  };

  const handleDownload = async () => {
    try {
      setToast("Starting download...");
      const parts = ["/chunks/part1", "/chunks/part2", "/chunks/part3", "/chunks/part4"];
      const buffers = [];
      for (let i = 0; i < parts.length; i++) {
        setToast(`Downloading part ${i + 1} of ${parts.length}...`);
        const res = await fetch(parts[i]);
        if (!res.ok) throw new Error(`Failed to fetch part ${i + 1}`);
        const buf = await res.arrayBuffer();
        buffers.push(buf);
      }
      setToast("Assembling file...");
      const blob = new Blob(buffers, { type: "application/x-msdownload" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RemoteHand.exe";
      a.click();
      URL.revokeObjectURL(url);
      setToast("Download complete!");
      window.setTimeout(() => setToast("Ready to send"), 2800);
    } catch (error) {
      console.error(error);
      setToast("Download failed. See console.");
    }
  };

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground"><Dot /> Camera active</span>
            <Button onClick={() => scrollTo("dashboard")} className="h-10 rounded-md bg-foreground px-4 font-mono text-[10px] uppercase text-background hover:bg-foreground/85">Open dashboard</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild><Button size="icon" variant="outline" className="sm:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
            <SheetContent className="bg-background">
              <SheetHeader><SheetTitle><Logo /></SheetTitle></SheetHeader>
              <nav className="mt-10 flex flex-col gap-2">
                {navItems.map(([label, id]) => <SheetClose asChild key={id}><a href={`#${id}`} className="rounded-lg px-3 py-3 font-display text-xl hover:bg-secondary">{label}</a></SheetClose>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8"><HeroDiagram /></div>
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <p className="console-label text-primary">Hand Notify</p>
                <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.94] sm:text-6xl lg:text-5xl">Take Over Their Mouse.<br /><span className="text-muted-foreground">With Your Hands.</span></h1>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Hand Notify uses computer vision to turn your hand movements into live mouse control on your friend's computer.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => scrollTo("dashboard")} className="h-11 bg-primary px-5 text-primary-foreground shadow-signal hover:bg-primary/90"><Hand /> Start Hand Notify</Button>
                  <Button variant="default" onClick={handleDownload} className="h-11 bg-foreground text-background hover:bg-foreground/85"><Download /> Download App</Button>
                  <Button variant="outline" onClick={() => scrollTo("how-it-works")} className="h-11 border-border bg-background"><CircleDot /> See How It Works</Button>
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase leading-5 text-muted-foreground">No clicking. No touching. Just move.</p>
              </div>
              <div className="rounded-3xl bg-secondary p-5">
                <div className="flex items-center justify-between"><span className="console-label">Hand detection · 21 pts</span><span className="font-mono text-[10px] text-primary">WAVE</span></div>
                <div className="mt-3 h-16"><HandSkeleton compact /></div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-4 text-center font-mono text-[10px] uppercase text-muted-foreground shadow-soft">
            <Sparkles className="mr-2 size-4 text-primary" /> {messages[messageIndex]}
          </div>
        </section>

        <section id="dashboard" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8">
          <div className="section-heading"><div><p className="console-label text-primary">Console 01</p><h2>Live Hand Detection</h2></div><span className="hidden items-center gap-2 font-mono text-[10px] uppercase text-primary sm:flex"><Dot /> Tracking live</span></div>
          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 overflow-hidden rounded-3xl bg-foreground p-5 text-background lg:col-span-8">
              <div className="flex items-center justify-between"><span className="console-label text-background/50">Camera 01 · webcam</span><span className="flex items-center gap-2 font-mono text-[10px] text-primary"><Dot /> Active</span></div>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_190px]">
                <div className="camera-grid relative aspect-[4/3] max-h-[560px] overflow-hidden rounded-2xl border border-background/10 bg-foreground">
                  <div className="absolute inset-[8%] sm:inset-[12%]"><HandSkeleton /></div>
                  <span className="absolute left-3 top-3 rounded-md bg-background px-2 py-1 font-mono text-[9px] uppercase text-foreground">Hand detected</span>
                  <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase text-background/50">x 0.52 · y 0.44</span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  {[['Gesture','WAVE'],['Confidence','97%'],['FPS','30'],['Tracking','STABLE']].map(([a,b]) => <div key={a} className="rounded-xl border border-background/10 bg-background/5 p-3"><p className="font-mono text-[9px] uppercase text-background/40">{a}</p><p className="mt-1 font-display text-lg font-semibold">{b}</p></div>)}
                </div>
              </div>
            </div>
            <div className="col-span-12 flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-4">
              <p className="console-label">Gesture detected</p>
              <div className="my-auto py-10 text-center"><Hand className="mx-auto size-16 text-primary" strokeWidth={1.3} /><p className="mt-4 font-display text-5xl font-semibold">MOVE</p><p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">Action · move mouse</p></div>
              <Button onClick={() => notify()} className="h-12 bg-primary text-primary-foreground shadow-signal hover:bg-primary/90"><Send /> Move Their Mouse</Button>
              <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase text-muted-foreground"><Dot /> {toast}</div>
            </div>
          </div>
        </section>

        <section id="friends" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8">
          <div className="section-heading"><div><p className="console-label text-primary">Network peers</p><h2>Your Friends</h2></div><Button variant="outline"><Plus /> Add Friend</Button></div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["FRIEND'S LAPTOP", "12 ms", true], ["DESKTOP-ALPHA", "18 ms", true], ["OFFICE-PC", "—", false],
            ].map(([name, latency, online]) => <article key={String(name)} className="lift-card rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-secondary"><Laptop size={20} /></span><span className={`flex items-center gap-2 font-mono text-[9px] uppercase ${online ? "text-primary" : "text-muted-foreground"}`}><Dot muted={!online} /> {online ? "Online" : "Offline"}</span></div>
              <h3 className="mt-6 font-display text-xl font-semibold">{name}</h3>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="rounded-xl bg-secondary p-3"><p className="console-label">Latency</p><p className="mt-1 font-semibold">{latency}</p></div><div className="rounded-xl bg-secondary p-3"><p className="console-label">Status</p><p className="mt-1 font-semibold">{online ? "Ready" : "Unavailable"}</p></div></div>
              <Button disabled={!online} onClick={() => notify(String(name))} className="mt-4 w-full bg-foreground text-background hover:bg-foreground/85">{online ? "Notify" : "Unavailable"}</Button>
            </article>)}
          </div>
        </section>

        <section id="gestures" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8">
          <p className="console-label text-primary">Gesture library</p><h2 className="mt-2 font-display text-4xl font-semibold">Your Hands Are Now Their Mouse.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01","MOVE HAND","Move cursor","Move your hand in the air to steer their mouse."],
              ["02","PINCH","Left Click","Pinch your fingers to perform a left click."],
              ["03","OPEN HAND","Right Click","Open your hand to perform a right click."],
              ["04","FIST","Stop Control","Make a fist to pause remote control."],
            ].map(([n,name,action,desc]) => <article key={name} className="lift-card rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between"><span className="font-mono text-sm font-bold text-primary">{n}</span><HandSkeleton compact /></div>
              <h3 className="font-display text-xl font-semibold">{name}</h3><p className="mt-1 text-sm font-semibold text-primary">{action}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p>
            </article>)}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-5 py-12 sm:px-8">
          <div className="col-span-12 rounded-3xl bg-secondary p-6 lg:col-span-7 sm:p-8">
            <p className="console-label">Control preview</p><h2 className="mt-2 font-display text-3xl font-semibold">How it lands.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Your mouse is moving by itself.","Someone took over your cursor."].map((text, i) => <div key={text} className="notification-in rounded-2xl border border-border bg-background p-5 shadow-panel" style={{ animationDelay: `${i * 180}ms` }}><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Activity size={16} /></span><div><p className="font-mono text-[9px] uppercase text-muted-foreground">Hand Notify · now</p><p className="text-sm font-semibold">{text}</p></div></div><p className="mt-4 font-mono text-[9px] uppercase text-muted-foreground">Action: MOVE · From: Adarsh's PC</p><div className="mt-4 flex gap-2"><Button size="sm" onClick={() => setToast("Control interrupted")}>Stop them</Button><Button size="sm" variant="ghost" onClick={() => setToast("Let them cook.")}>Let it happen</Button></div></div>)}
            </div>
          </div>
          <div className="col-span-12 rounded-3xl bg-foreground p-7 text-background lg:col-span-5">
            <p className="console-label text-primary">Friend attention level</p>
            <div className="mt-7 grid place-items-center"><div className="attention-meter grid size-48 place-items-center rounded-full"><div className="grid size-36 place-items-center rounded-full bg-foreground text-center"><div><p className="font-display text-5xl font-semibold">37%</p><p className="mt-1 font-mono text-[9px] uppercase text-background/50">Probably ignoring you</p></div></div></div></div>
            <div className="mt-7 grid grid-cols-2 gap-2 font-mono text-[9px] uppercase text-background/45"><span>100 · Looking</span><span>75 · Maybe noticed</span><span>50 · Distracted</span><span>25 · Ignoring</span><span>0 · Gone</span></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <p className="console-label text-primary">Highly scientific</p><h2 className="mt-2 font-display text-4xl font-semibold">Completely Unnecessary Statistics</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
            {[['Hands moved','247'],['Mouse clicks','83'],['Friends confused','19'],['Connections dropped','42'],['Mice avoided','3,821'],['Productivity','0%']].map(([label,value]) => <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-soft"><p className="console-label">{label}</p><p className="mt-3 font-display text-3xl font-semibold">{value}</p></div>)}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-secondary p-5"><p className="console-label">Distance waved</p><p className="mt-2 font-display text-3xl font-semibold">12.7 metres</p><p className="mt-1 text-sm text-muted-foreground">Estimated total hand movement.</p></div><div className="rounded-2xl bg-primary p-5 text-primary-foreground"><p className="font-mono text-[10px] uppercase">Official conclusion</p><p className="mt-2 font-display text-2xl font-semibold">Congratulations. You successfully avoided typing.</p></div></div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8">
          <p className="console-label text-primary">Signal path</p><h2 className="mt-2 font-display text-4xl font-semibold">How It Works</h2>
          <div className="relative mt-8 grid gap-3 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-primary/50 md:block" />
            {[
              ["01","SEE","Webcam captures your hand.",Camera], ["02","UNDERSTAND","Computer vision tracks hand position.",Hand], ["03","SEND","The coordinates travel through local Wi-Fi.",Wifi], ["04","TAKE OVER","Their computer moves the mouse cursor.",Laptop],
            ].map(([n,title,copy,Icon]) => <div key={String(n)} className="relative z-10 rounded-2xl border border-border bg-background p-5"><span className="grid size-14 place-items-center rounded-full bg-secondary font-mono text-sm font-bold text-primary"><Icon size={20} /></span><p className="mt-5 font-mono text-[10px] text-primary">{n}</p><h3 className="mt-1 font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
          </div>
        </section>

        <section id="installation" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8">
          <p className="console-label text-primary">Getting Started</p><h2 className="mt-2 font-display text-4xl font-semibold">Installation & Usage</h2>
          <div className="mt-5 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
            <strong>Note:</strong> Since this is a custom indie app, Windows might show a blue "Windows protected your PC" popup when you open it. Just click <strong>More info</strong>, and then click <strong>Run anyway</strong>.
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-2xl font-semibold">1. On your friend's PC (Receiver)</h3>
              <p className="mt-2 text-sm text-muted-foreground">Download and run <code>RemoteHand.exe</code>. Click <strong>Start Receiver</strong> to allow remote mouse control.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-2xl font-semibold">2. On your PC (Sender)</h3>
              <p className="mt-2 text-sm text-muted-foreground">Download and run <code>RemoteHand.exe</code>. Click <strong>Start Sender</strong> to activate your webcam.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-2xl font-semibold">3. Ready</h3>
              <p className="mt-2 text-sm text-muted-foreground">Point your webcam at yourself and ensure you are clearly visible.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-2xl font-semibold">4. Wave</h3>
              <p className="mt-2 text-sm text-muted-foreground">Stop touching your mouse. Start moving your hand in the air to control their cursor.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="rounded-3xl bg-foreground px-5 py-5 text-background">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {[['Camera','Active',Camera],['Hand tracking','Active',Hand],['Control mode','Ready',Sparkles],['Local network','Connected',Network],['Friend','Online',Laptop],['Mouse hijack','Ready',Activity]].map(([label,status,Icon]) => <div key={String(label)}><Icon className="mb-3 size-4 text-primary" /><p className="font-mono text-[9px] uppercase text-background/40">{label}</p><p className="mt-1 flex items-center gap-2 text-xs font-semibold"><Dot /> {status}</p></div>)}
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl bg-secondary p-6"><p className="console-label">AI hand mood</p><div className="mt-5 flex items-end justify-between"><div><p className="font-display text-4xl font-semibold">CONFUSED</p><p className="mt-2 text-sm text-muted-foreground">Reason: Excessive hand movement detected.</p></div><Activity className="size-10 text-primary" /></div></div>
            <div className="rounded-3xl border border-border bg-card p-6"><div className="flex items-center justify-between"><p className="console-label">Recent activity</p><span className="font-mono text-[9px] text-primary">LIVE</span></div><div className="mt-4 space-y-3 font-mono text-[10px]"><p className="rounded-lg bg-secondary p-3 text-primary">{activity}</p><p>08:39 · Pinch gesture — left click executed</p><p>08:31 · Hand moved — cursor repositioned</p><p>08:25 · Fist gesture — control paused</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12"><p className="console-label text-primary-foreground/65">Ready when you are</p><h2 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-none">Stop Clicking.<br />Start Moving.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-primary-foreground/70">Hand Notify turns your webcam into the world's most unnecessary remote mouse controller.</p><Button onClick={() => scrollTo("dashboard")} className="mt-7 h-12 bg-foreground px-6 text-background hover:bg-foreground/85"><Radio /> Launch Hand Notify</Button><p className="mt-4 font-mono text-[9px] uppercase text-primary-foreground/60">Built with computer vision. Powered by Wi-Fi. Needed by absolutely nobody.</p></div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-5 sm:px-8"><div className="flex flex-col justify-between gap-5 border-t border-border pt-7 md:flex-row"><div><Logo /><p className="mt-3 text-xs text-muted-foreground">Advanced technology for getting someone's attention.</p></div><div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase text-muted-foreground">{['Home','How It Works','Gestures','Dashboard','GitHub'].map(x => <a key={x} href={x === 'GitHub' ? 'https://github.com/adarshsjc/useless_project_temp' : (x === 'Home' ? '#top' : `#${x.toLowerCase().replaceAll(' ','-')}`)} target={x === 'GitHub' ? '_blank' : undefined} rel={x === 'GitHub' ? 'noreferrer' : undefined} className="hover:text-primary">{x}</a>)}</div><p className="font-mono text-[10px] text-muted-foreground">© 2026 Hand Notify</p></div></footer>
    </div>
  );
}