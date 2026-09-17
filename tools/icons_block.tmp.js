/* ==============================
   lucide-react icons (embedded — ISC license, lucide.dev)
   Tiny factory equivalent of createLucideIcon
   ============================== */
function createLucideIcon(data) {
  const IconComponent = ({ size = 24, color = 'currentColor', ...rest }) =>
    React.createElement(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        ...rest,
      },
      data.node.map(([tag, attrs], i) =>
        React.createElement(tag, { ...attrs, key: attrs.key || i })
      )
    );
  IconComponent.displayName = data.name;
  return IconComponent;
}

const Home = createLucideIcon({ name: 'house', node: [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "r6nss1" }]] });
const Calendar = createLucideIcon({ name: 'calendar', node: [["path", { d: "M8 2v3", key: "1ioesn" }], ["path", { d: "M16 2v3", key: "otl347" }], ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }], ["path", { d: "M3 9h18", key: "1pudct" }]] });
const UtensilsCrossed = createLucideIcon({ name: 'utensils-crossed', node: [["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }], ["path", { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }], ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }], ["path", { d: "m19 5-7 7", key: "194lzd" }]] });
const Activity = createLucideIcon({ name: 'activity', node: [["path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2", key: "169zse" }]] });
const BarChart2 = createLucideIcon({ name: 'chart-no-axes-column', node: [["path", { d: "M5 21v-6", key: "1hz6c0" }], ["path", { d: "M12 21V3", key: "1lcnhd" }], ["path", { d: "M19 21V9", key: "unv183" }]] });
const Award = createLucideIcon({ name: 'award', node: [["path", { d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526", key: "1yiouv" }], ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]] });
const BookOpen = createLucideIcon({ name: 'book-open', node: [["path", { d: "M12 5v16", key: "1f6ucr" }], ["path", { d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z", key: "1fyvmf" }]] });
const CheckCircle = createLucideIcon({ name: 'circle-check-big', node: [["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }], ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]] });
const CheckCircle2 = createLucideIcon({ name: 'circle-check', node: [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]] });
const Circle = createLucideIcon({ name: 'circle', node: [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]] });
const Flame = createLucideIcon({ name: 'flame', node: [["path", { d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4", key: "1slcih" }]] });
const Apple = createLucideIcon({ name: 'apple', node: [["path", { d: "M12 6.528V3a1 1 0 0 1 1-1h0", key: "11qiee" }], ["path", { d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21", key: "110c12" }]] });
const Dumbbell = createLucideIcon({ name: 'dumbbell', node: [["path", { d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z", key: "9m4mmf" }], ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }], ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }], ["path", { d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z", key: "1t2c92" }], ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]] });
const ExternalLink = createLucideIcon({ name: 'external-link', node: [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]] });
const Plus = createLucideIcon({ name: 'plus', node: [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]] });
const Trash2 = createLucideIcon({ name: 'trash', node: [["path", { d: "M10 11v6", key: "nco0om" }], ["path", { d: "M14 11v6", key: "outv1u" }], ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }], ["path", { d: "M3 6h18", key: "d0wm0j" }], ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]] });
const TrendingUp = createLucideIcon({ name: 'trending-up', node: [["path", { d: "M16 7h6v6", key: "box55l" }], ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]] });
const Save = createLucideIcon({ name: 'save', node: [["path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", key: "1c8476" }], ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }], ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]] });
const ChevronDown = createLucideIcon({ name: 'chevron-down', node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]] });
const ChevronUp = createLucideIcon({ name: 'chevron-up', node: [["path", { d: "m18 15-6-6-6 6", key: "b4htg2" }]] });
const Star = createLucideIcon({ name: 'star', node: [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]] });
const Zap = createLucideIcon({ name: 'zap', node: [["path", { d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z", key: "1v7up4" }]] });
const Heart = createLucideIcon({ name: 'heart', node: [["path", { d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5", key: "mvr1a0" }]] });
const Trophy = createLucideIcon({ name: 'trophy', node: [["path", { d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2", key: "pwuv1l" }], ["path", { d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2", key: "1y54w1" }], ["path", { d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3", key: "e30mpu" }], ["path", { d: "M4 22h16", key: "57wxv0" }], ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }], ["path", { d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3", key: "i0yafy" }]] });
