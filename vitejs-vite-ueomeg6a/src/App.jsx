import React, { useState, useMemo, useRef } from 'react';
import {
  Car,
  Calendar,
  Users,
  Bell,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ArrowLeftRight,
  ChevronRight,
  Upload,
  Copy,
  AlertTriangle,
  UserCheck,
  UserX,
  Sparkles,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  Navigation,
  LogIn,
  UserPlus,
  CheckCircle2,
  Info,
  CalendarDays,
} from 'lucide-react';

// --- PALETTE COLORI UNIVOCI UTENTE ---
const USER_COLORS = {
  blue: {
    id: 'blue',
    name: 'Blu Cobalto',
    bg: 'bg-blue-600',
    bgSoft: 'bg-blue-50',
    bgMedium: 'bg-blue-100',
    text: 'text-blue-700',
    textOnSolid: 'text-white',
    border: 'border-blue-300',
    ring: 'ring-blue-500',
    hex: '#2563eb',
  },
  emerald: {
    id: 'emerald',
    name: 'Verde Smeraldo',
    bg: 'bg-emerald-600',
    bgSoft: 'bg-emerald-50',
    bgMedium: 'bg-emerald-100',
    text: 'text-emerald-700',
    textOnSolid: 'text-white',
    border: 'border-emerald-300',
    ring: 'ring-emerald-500',
    hex: '#059669',
  },
  violet: {
    id: 'violet',
    name: 'Viola Ametista',
    bg: 'bg-violet-600',
    bgSoft: 'bg-violet-50',
    bgMedium: 'bg-violet-100',
    text: 'text-violet-700',
    textOnSolid: 'text-white',
    border: 'border-violet-300',
    ring: 'ring-violet-500',
    hex: '#7c3aed',
  },
  amber: {
    id: 'amber',
    name: 'Ambra Dorata',
    bg: 'bg-amber-500',
    bgSoft: 'bg-amber-50',
    bgMedium: 'bg-amber-100',
    text: 'text-amber-800',
    textOnSolid: 'text-white',
    border: 'border-amber-300',
    ring: 'ring-amber-500',
    hex: '#f59e0b',
  },
  rose: {
    id: 'rose',
    name: 'Rosa Corallo',
    bg: 'bg-rose-600',
    bgSoft: 'bg-rose-50',
    bgMedium: 'bg-rose-100',
    text: 'text-rose-700',
    textOnSolid: 'text-white',
    border: 'border-rose-300',
    ring: 'ring-rose-500',
    hex: '#e11d48',
  },
  cyan: {
    id: 'cyan',
    name: 'Ciano Oceano',
    bg: 'bg-cyan-600',
    bgSoft: 'bg-cyan-50',
    bgMedium: 'bg-cyan-100',
    text: 'text-cyan-700',
    textOnSolid: 'text-white',
    border: 'border-cyan-300',
    ring: 'ring-cyan-500',
    hex: '#0891b2',
  },
  orange: {
    id: 'orange',
    name: 'Arancio Tramonto',
    bg: 'bg-orange-600',
    bgSoft: 'bg-orange-50',
    bgMedium: 'bg-orange-100',
    text: 'text-orange-700',
    textOnSolid: 'text-white',
    border: 'border-orange-300',
    ring: 'ring-orange-500',
    hex: '#ea580c',
  },
};

// --- GIORNI DELLA SETTIMANA (Settimana Universitaria Tipo) ---
const WEEK_DAYS = [
  {
    index: 0,
    short: 'Lun',
    full: 'Lunedì',
    dateLabel: '23 Nov',
    iso: '2026-11-23',
  },
  {
    index: 1,
    short: 'Mar',
    full: 'Martedì',
    dateLabel: '24 Nov',
    iso: '2026-11-24',
  },
  {
    index: 2,
    short: 'Mer',
    full: 'Mercoledì',
    dateLabel: '25 Nov',
    iso: '2026-11-25',
  },
  {
    index: 3,
    short: 'Gio',
    full: 'Giovedì',
    dateLabel: '26 Nov',
    iso: '2026-11-26',
  },
  {
    index: 4,
    short: 'Ven',
    full: 'Venerdì',
    dateLabel: '27 Nov',
    iso: '2026-11-27',
  },
  {
    index: 5,
    short: 'Sab',
    full: 'Sabato',
    dateLabel: '28 Nov',
    iso: '2026-11-28',
  },
];

// --- DATI INIZIALI REALISTICI ---
const INITIAL_USERS = [
  {
    id: 'u1',
    name: 'Marco Rossi',
    shortName: 'Marco',
    email: 'marco.rossi@studenti.univpm.it',
    avatar: 'MR',
    color: 'blue',
    hasCar: true,
    carModel: 'Fiat Panda Grigia',
    seats: 4,
  },
  {
    id: 'u2',
    name: 'Giulia Bianchi',
    shortName: 'Giulia',
    email: 'giulia.bianchi@studenti.univpm.it',
    avatar: 'GB',
    color: 'emerald',
    hasCar: true,
    carModel: 'Toyota Yaris Blu',
    seats: 4,
  },
  {
    id: 'u3',
    name: 'Luca Verdi',
    shortName: 'Luca',
    email: 'luca.verdi@studenti.univpm.it',
    avatar: 'LV',
    color: 'violet',
    hasCar: true,
    carModel: 'VW Polo Nera',
    seats: 4,
  },
  {
    id: 'u4',
    name: 'Sara Neri',
    shortName: 'Sara',
    email: 'sara.neri@studenti.univpm.it',
    avatar: 'SN',
    color: 'amber',
    hasCar: false,
    carModel: '',
    seats: 0,
  },
  {
    id: 'u5',
    name: 'Matteo Ricci',
    shortName: 'Matteo',
    email: 'matteo.ricci@studenti.univpm.it',
    avatar: 'MR2',
    color: 'cyan',
    hasCar: true,
    carModel: 'Ford Fiesta Bianca',
    seats: 4,
  },
  {
    id: 'u6',
    name: 'Elena Conti',
    shortName: 'Elena',
    email: 'elena.conti@studenti.univpm.it',
    avatar: 'EC',
    color: 'rose',
    hasCar: false,
    carModel: '',
    seats: 0,
  },
];

const INITIAL_GROUPS = [
  {
    id: 'g1',
    name: 'Pendolari Jesi - Ancona (6)',
    route: 'Jesi (Stazione / Viale) ➔ Polo Monte Dago',
    inviteCode: 'JESI-AN26',
    memberIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    rotationOrder: ['u1', 'u2', 'u3', 'u5'], // Coda circolare fissa: Marco -> Giulia -> Luca -> Matteo
    // Auto extra aggiunte manualmente per giorno/direzione: { [dayIndex]: { outbound: [...], inbound: [...] } }
    extraRides: {
      0: {
        // Lunedì: 6 studenti presenti -> oltre a Marco (Auto #1), Giulia offre una 2ª auto per il rientro anticipato delle 13:15!
        outbound: [
          {
            id: 'ride-init-out-2',
            driverId: 'u2',
            time: '08:15',
            seats: 4,
            label: 'Auto #2 (Capacità 6 studenti)',
            isExtra: true,
          },
        ],
        inbound: [
          {
            id: 'ride-init-in-2',
            driverId: 'u2',
            time: '13:15',
            seats: 4,
            label: 'Rientro Anticipato (Fine ore 13:00)',
            isExtra: true,
          },
        ],
      },
    },
    // Scelte posto per utente: { [`${dayIndex}_${direction}_${userId}`]: rideId }
    seatBookings: {
      '0_outbound_u1': 'auto-0-outbound-0',
      '0_outbound_u3': 'auto-0-outbound-0',
      '0_outbound_u4': 'auto-0-outbound-0',
      '0_outbound_u5': 'auto-0-outbound-0',
      '0_outbound_u2': 'ride-init-out-2',
      '0_outbound_u6': 'ride-init-out-2',
      '0_inbound_u1': 'auto-0-inbound-0',
      '0_inbound_u3': 'auto-0-inbound-0',
      '0_inbound_u5': 'auto-0-inbound-0',
      '0_inbound_u2': 'ride-init-in-2',
      '0_inbound_u4': 'ride-init-in-2',
      '0_inbound_u6': 'ride-init-in-2',
    },
    // Overrides manuali per giorno sull'Auto #1: { [dayIndex]: { outbound: userId, inbound: userId } }
    manualOverrides: {},
    // Scambi approvati (swap senza rompere l'ordine): [{ id, dayA, userA, dayB, userB }]
    approvedSwaps: [
      {
        id: 'sw-init-1',
        dayA: 2, // Mercoledì: toccava a Luca (u3), scambiato con Marco (u1)
        userA: 'u3',
        dayB: 3, // Giovedì: toccava a Matteo (u5), scambiato con Luca (u3)
        userB: 'u5',
      },
    ],
    // Richieste di scambio pendenti
    swapRequests: [
      {
        id: 'req-1',
        fromUserId: 'u2', // Giulia
        toUserId: 'u1', // Marco
        fromDay: 1, // Martedì (turno di Giulia)
        toDay: 0, // Lunedì (turno di Marco)
        reason:
          'Domani mattina ho visita medica e arrivo tardi, scambiamo con oggi?',
        status: 'pending',
      },
    ],
  },
  {
    id: 'g2',
    name: 'Gruppo Tirocinio Torrette',
    route: 'Jesi Centro ➔ Polo Medicina Torrette',
    inviteCode: 'TIR-MED99',
    memberIds: ['u1', 'u3', 'u4', 'u6'],
    rotationOrder: ['u3', 'u1'],
    extraRides: {},
    seatBookings: {},
    manualOverrides: {},
    approvedSwaps: [],
    swapRequests: [],
  },
];

const INITIAL_LESSONS = [
  // Lunedì (dayIndex: 0) - 6 studenti presenti con orari sfalsati (13:00 vs 17:00) e 2 auto necessarie!
  {
    id: 'l1',
    groupId: 'g1',
    dayIndex: 0,
    title: 'Analisi Matematica II',
    startTime: '09:00',
    endTime: '11:00',
    room: 'Aula A1 - Quota 145',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    cancelled: false,
  },
  {
    id: 'l2',
    groupId: 'g1',
    dayIndex: 0,
    title: 'Fisica Generale II',
    startTime: '11:00',
    endTime: '13:00',
    room: 'Aula B2 - Blocco Sud',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    cancelled: false,
  },
  {
    id: 'l3',
    groupId: 'g1',
    dayIndex: 0,
    title: 'Laboratorio Sistemi Digitali',
    startTime: '15:00',
    endTime: '17:00',
    room: 'Lab Informatica 3',
    attendees: ['u1', 'u3', 'u5'], // Giulia, Sara ed Elena finiscono alle 13:00; Marco, Luca e Matteo alle 17:00!
    cancelled: false,
  },
  // Martedì (dayIndex: 1) - 6 studenti con partenze sfalsate (08:30 vs 10:30)!
  {
    id: 'l4',
    groupId: 'g1',
    dayIndex: 1,
    title: 'Fondamenti di Automatica',
    startTime: '08:30',
    endTime: '10:30',
    room: 'Aula Magna',
    attendees: ['u2', 'u4', 'u6'],
    cancelled: false,
  },
  {
    id: 'l5',
    groupId: 'g1',
    dayIndex: 1,
    title: 'Elettronica Applicata',
    startTime: '10:30',
    endTime: '13:30',
    room: 'Aula C4',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    cancelled: false,
  },
  // Mercoledì (dayIndex: 2)
  {
    id: 'l6',
    groupId: 'g1',
    dayIndex: 2,
    title: 'Basi di Dati e Web',
    startTime: '08:30',
    endTime: '11:30',
    room: 'Aula D1',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5'],
    cancelled: false,
  },
  {
    id: 'l7',
    groupId: 'g1',
    dayIndex: 2,
    title: 'Seminario Cloud Computing',
    startTime: '12:00',
    endTime: '14:00',
    room: 'Aula Verde',
    attendees: ['u1', 'u3', 'u5'],
    cancelled: false,
  },
  // Giovedì (dayIndex: 3)
  {
    id: 'l8',
    groupId: 'g1',
    dayIndex: 3,
    title: 'Analisi Matematica II',
    startTime: '09:00',
    endTime: '12:00',
    room: 'Aula A1 - Quota 145',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    cancelled: false,
  },
  {
    id: 'l9',
    groupId: 'g1',
    dayIndex: 3,
    title: 'Esercitazione Fisica II',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Aula B2',
    attendees: ['u2', 'u3', 'u4', 'u6'],
    cancelled: false,
  },
  // Venerdì (dayIndex: 4)
  {
    id: 'l10',
    groupId: 'g1',
    dayIndex: 4,
    title: 'Inglese Scientifico B2',
    startTime: '09:30',
    endTime: '12:30',
    room: 'Centro Linguistico',
    attendees: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    cancelled: false,
  },
  // Gruppo 2 (Tirocinio)
  {
    id: 'l20',
    groupId: 'g2',
    dayIndex: 0,
    title: 'Tirocinio Clinico Reparto',
    startTime: '08:00',
    endTime: '13:30',
    room: 'Ospedale Torrette - Pad. B',
    attendees: ['u1', 'u3', 'u4', 'u6'],
    cancelled: false,
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    groupId: 'g1',
    type: 'swap_request',
    title: 'Richiesta Scambio Turno',
    message:
      'Giulia vorrebbe scambiare il suo turno di Martedì con il turno di Lunedì di Marco.',
    time: '12 min fa',
    read: false,
    swapRequestId: 'req-1',
  },
  {
    id: 'n2',
    groupId: 'g1',
    type: 'attendance',
    title: 'Aggiornamento Presenze',
    message:
      'Giulia ha disdetto la lezione delle 15:00 di Lunedì (rientra alle 13:00).',
    time: '1 ora fa',
    read: false,
  },
  {
    id: 'n3',
    groupId: 'g1',
    type: 'swap_done',
    title: 'Scambio Confermato',
    message:
      'Marco e Luca hanno scambiato i turni di Mercoledì e Giovedì mantenendo intatta la coda.',
    time: 'Ieri',
    read: true,
  },
];

// --- HELPER: CALCOLO ORARI ---
const timeToMinutes = (t) => {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const minutesToTime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// --- PARSER SEMPLIFICATO FILE .ICS (iCal / Cineca Esse3) ---
function parseICSContent(icsText, groupId, memberIds) {
  const events = [];
  const blocks = icsText.split('BEGIN:VEVENT');
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split('END:VEVENT')[0];
    const summaryMatch = block.match(/SUMMARY(?:;[^:]*)?:([^\r\n]+)/);
    const locationMatch = block.match(/LOCATION(?:;[^:]*)?:([^\r\n]+)/);
    const dtStartMatch = block.match(/DTSTART(?:;[^:]*)?:(\d{8}T\d{4,6})/);
    const dtEndMatch = block.match(/DTEND(?:;[^:]*)?:(\d{8}T\d{4,6})/);

    const title = summaryMatch ? summaryMatch[1].trim() : 'Lezione Importata';
    const room = locationMatch ? locationMatch[1].trim() : 'Sede Universitaria';

    let dayIndex = 0;
    let startTime = '09:00';
    let endTime = '11:00';

    if (dtStartMatch) {
      const raw = dtStartMatch[1]; // YYYYMMDDTHHMMSS
      const y = parseInt(raw.slice(0, 4), 10);
      const m = parseInt(raw.slice(4, 6), 10) - 1;
      const d = parseInt(raw.slice(6, 8), 10);
      const dt = new Date(y, m, d);
      const jsDay = dt.getDay(); // 0 = Sun, 1 = Mon...
      dayIndex = jsDay === 0 ? 0 : Math.min(5, jsDay - 1);
      startTime = `${raw.slice(9, 11)}:${raw.slice(11, 13)}`;
    }
    if (dtEndMatch) {
      const rawEnd = dtEndMatch[1];
      endTime = `${rawEnd.slice(9, 11)}:${rawEnd.slice(11, 13)}`;
    }

    events.push({
      id: `ics-${Date.now()}-${i}`,
      groupId,
      dayIndex,
      title,
      startTime,
      endTime,
      room,
      attendees: [...memberIds],
      cancelled: false,
    });
  }
  return events;
}

export default function App() {
  // --- STATO GLOBALE APPLICAZIONE ---
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState('u1'); // Marco attivo di default
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [activeGroupId, setActiveGroupId] = useState('g1');
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Navigazione e UI State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'calendar' | 'turns' | 'profile'
  const [selectedDay, setSelectedDay] = useState(0); // Lunedì di default
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [toast, setToast] = useState(null);

  // Modali Interattive
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetDay, setSwapTargetDay] = useState(null);
  const [swapPartnerId, setSwapPartnerId] = useState('');
  const [swapPartnerDay, setSwapPartnerDay] = useState(1);
  const [swapReason, setSwapReason] = useState('');

  const [showManualDriveModal, setShowManualDriveModal] = useState(false);
  const [offerRideDirection, setOfferRideDirection] = useState('both'); // 'both' | 'outbound' | 'inbound'
  const [offerRideOutboundTime, setOfferRideOutboundTime] = useState('08:15');
  const [offerRideInboundTime, setOfferRideInboundTime] = useState('17:15');
  const [offerRideSeats, setOfferRideSeats] = useState(4);
  const [offerRideLabel, setOfferRideLabel] = useState('');
  const [offerRideAsExtra, setOfferRideAsExtra] = useState(true);

  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupRoute, setNewGroupRoute] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [regName, setRegName] = useState('');
  const [regColor, setRegColor] = useState('rose');
  const [regHasCar, setRegHasCar] = useState(true);
  const [regCarModel, setRegCarModel] = useState('');

  // Form Aggiunta/Modifica Lezione
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    dayIndex: 0,
    startTime: '09:00',
    endTime: '11:00',
    room: '',
  });
  const [icsUrlInput, setIcsUrlInput] = useState(
    'https://esse3.univpm.it/ical/studente_109482.ics'
  );
  const fileInputRef = useRef(null);

  // --- SELETTORI DERIVATI ---
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || users[0],
    [users, currentUserId]
  );

  const activeGroup = useMemo(
    () => groups.find((g) => g.id === activeGroupId) || groups[0],
    [groups, activeGroupId]
  );

  const groupMembers = useMemo(
    () =>
      activeGroup.memberIds
        .map((id) => users.find((u) => u.id === id))
        .filter(Boolean),
    [activeGroup, users]
  );

  const groupDrivers = useMemo(
    () =>
      activeGroup.rotationOrder
        .map((id) => users.find((u) => u.id === id))
        .filter(Boolean),
    [activeGroup, users]
  );

  const groupLessons = useMemo(
    () => lessons.filter((l) => l.groupId === activeGroup.id),
    [lessons, activeGroup.id]
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter((n) => !n.read && n.groupId === activeGroup.id)
        .length,
    [notifications, activeGroup.id]
  );

  // Helper Toast Notification
  const triggerToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3400);
  };

  // Helper Aggiunta Notifica
  const pushNotification = (type, title, message, extra = {}) => {
    const newNotif = {
      id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      groupId: activeGroup.id,
      type,
      title,
      message,
      time: 'Adesso',
      read: false,
      ...extra,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // --- ALGORITMO DI ROTAZIONE CIRCOLARE CON SUPPORTO SCAMBI E OVERRIDE ---
  const getDriverScheduleForDay = (dayIdx) => {
    const order = activeGroup.rotationOrder;
    if (!order || order.length === 0) {
      return {
        outboundDriver: null,
        inboundDriver: null,
        baseDriver: null,
        status: 'none',
        note: 'Nessun utente automunito nel gruppo',
      };
    }

    // 1. Calcolo base dalla coda circolare fissa (dayIdx % order.length)
    const baseDriverId = order[dayIdx % order.length];
    let resolvedDriverId = baseDriverId;
    let status = 'rotation'; // 'rotation' | 'swapped' | 'manual'
    let note = 'A giro • Turno regolare da coda circolare';

    // 2. Verifica scambi approvati (Swap) senza rompere l'ordine ciclico
    for (const swap of activeGroup.approvedSwaps) {
      if (swap.dayA === dayIdx) {
        resolvedDriverId = swap.userB;
        status = 'swapped';
        const origUser = users.find((u) => u.id === swap.userA);
        note = `A giro • Scambiato con ${origUser?.shortName || 'compagno'}`;
      } else if (swap.dayB === dayIdx) {
        resolvedDriverId = swap.userA;
        status = 'swapped';
        const origUser = users.find((u) => u.id === swap.userB);
        note = `A giro • Recupero scambio con ${
          origUser?.shortName || 'compagno'
        }`;
      }
    }

    let outboundDriverId = resolvedDriverId;
    let inboundDriverId = resolvedDriverId;

    // 3. Verifica assegnazione autonoma / manuale per giorno sull'Auto #1
    const override = activeGroup.manualOverrides[dayIdx];
    if (override) {
      if (override.outbound) outboundDriverId = override.outbound;
      if (override.inbound) inboundDriverId = override.inbound;
      status = 'manual';
      const outU = users.find((u) => u.id === outboundDriverId);
      const inU = users.find((u) => u.id === inboundDriverId);
      note =
        outboundDriverId === inboundDriverId
          ? `Scelta autonoma: ${outU?.shortName || 'Guidatore'}`
          : `Scelta autonoma: ${outU?.shortName || '?'} (A) • ${
              inU?.shortName || '?'
            } (R)`;
    }

    return {
      outboundDriver: users.find((u) => u.id === outboundDriverId) || null,
      inboundDriver: users.find((u) => u.id === inboundDriverId) || null,
      baseDriver: users.find((u) => u.id === baseDriverId) || null,
      status,
      note,
    };
  };

  // --- CONTEGGIO TURNI DI GUIDA EFFETTUATI/ASSEGNATI PER EQUITÀ ---
  const driverDriveCounts = useMemo(() => {
    const counts = {};
    groupDrivers.forEach((d) => {
      counts[d.id] = { outbound: 0, inbound: 0, total: 0 };
    });

    WEEK_DAYS.forEach((day) => {
      const sched = getDriverScheduleForDay(day.index);
      if (sched.outboundDriver && counts[sched.outboundDriver.id]) {
        counts[sched.outboundDriver.id].outbound += 1;
        counts[sched.outboundDriver.id].total += 1;
      }
      if (sched.inboundDriver && counts[sched.inboundDriver.id]) {
        counts[sched.inboundDriver.id].inbound += 1;
        counts[sched.inboundDriver.id].total += 1;
      }

      const extras = activeGroup.extraRides?.[day.index] || {
        outbound: [],
        inbound: [],
      };
      (extras.outbound || []).forEach((r) => {
        if (counts[r.driverId]) {
          counts[r.driverId].outbound += 1;
          counts[r.driverId].total += 1;
        }
      });
      (extras.inbound || []).forEach((r) => {
        if (counts[r.driverId]) {
          counts[r.driverId].inbound += 1;
          counts[r.driverId].total += 1;
        }
      });
    });

    return counts;
  }, [activeGroup, groupDrivers, users]);

  // Automunito consigliato: chi ha guidato meno volte in assoluto (a parità segue la coda)
  const recommendedLeastDriver = useMemo(() => {
    if (groupDrivers.length === 0) return null;
    return [...groupDrivers].sort((a, b) => {
      const ca = driverDriveCounts[a.id]?.total ?? 0;
      const cb = driverDriveCounts[b.id]?.total ?? 0;
      if (ca !== cb) return ca - cb;
      return (
        activeGroup.rotationOrder.indexOf(a.id) -
        activeGroup.rotationOrder.indexOf(b.id)
      );
    })[0];
  }, [groupDrivers, driverDriveCounts, activeGroup.rotationOrder]);

  // --- ANALISI PRESENZE, ORARI CONSIGLIATI E INCASTRI PER IL GIORNO SELEZIONATO ---
  const dayInsights = useMemo(() => {
    const dayLessons = groupLessons
      .filter((l) => l.dayIndex === selectedDay && !l.cancelled)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // Mappa per ogni membro: prima lezione e ultima lezione del giorno
    const memberSchedules = {};
    groupMembers.forEach((m) => {
      const myLessons = dayLessons.filter((l) => l.attendees.includes(m.id));
      if (myLessons.length > 0) {
        const first = myLessons[0];
        const last = myLessons[myLessons.length - 1];
        memberSchedules[m.id] = {
          user: m,
          firstStart: first.startTime,
          lastEnd: last.endTime,
          lessonsCount: myLessons.length,
        };
      }
    });

    const activeAttendees = Object.values(memberSchedules);

    if (activeAttendees.length === 0) {
      return {
        dayLessons,
        activeAttendees: [],
        recommendedDeparture: null,
        recommendedReturn: null,
        firstLessonTime: null,
        lastLessonTime: null,
        conflicts: [],
        earlyReturnTime: null,
        lateDepartureTime: null,
      };
    }

    // Orario prima lezione in assoluto tra i presenti e ultima lezione
    const earliestStartMins = Math.min(
      ...activeAttendees.map((a) => timeToMinutes(a.firstStart))
    );
    const latestStartMins = Math.max(
      ...activeAttendees.map((a) => timeToMinutes(a.firstStart))
    );
    const earliestEndMins = Math.min(
      ...activeAttendees.map((a) => timeToMinutes(a.lastEnd))
    );
    const latestEndMins = Math.max(
      ...activeAttendees.map((a) => timeToMinutes(a.lastEnd))
    );

    // Partenza consigliata: 45 min prima della prima lezione (es. Jesi -> Ancona)
    const recommendedDeparture = minutesToTime(
      Math.max(0, earliestStartMins - 45)
    );
    const lateDepartureTime = minutesToTime(Math.max(0, latestStartMins - 45));
    // Rientro consigliato: 15 min dopo la fine dell'ultima lezione
    const recommendedReturn = minutesToTime(latestEndMins + 15);
    const earlyReturnTime = minutesToTime(earliestEndMins + 15);

    // Rilevamento "Incastri Orari" (differenze significative su andata o ritorno)
    const conflicts = [];

    // Group by startTime
    const startGroups = {};
    activeAttendees.forEach((a) => {
      startGroups[a.firstStart] = startGroups[a.firstStart] || [];
      startGroups[a.firstStart].push(a.user.shortName);
    });
    if (Object.keys(startGroups).length > 1) {
      const summary = Object.entries(startGroups)
        .sort((a, b) => timeToMinutes(a[0]) - timeToMinutes(b[0]))
        .map(([time, names]) => `${names.join(', ')} (${time})`)
        .join(' vs ');
      conflicts.push({ type: 'Andata sfalsata', text: summary });
    }

    // Group by endTime
    const endGroups = {};
    activeAttendees.forEach((a) => {
      endGroups[a.lastEnd] = endGroups[a.lastEnd] || [];
      endGroups[a.lastEnd].push(a.user.shortName);
    });
    if (Object.keys(endGroups).length > 1) {
      const summary = Object.entries(endGroups)
        .sort((a, b) => timeToMinutes(a[0]) - timeToMinutes(b[0]))
        .map(([time, names]) => `${names.join(', ')} (${time})`)
        .join(' vs ');
      conflicts.push({ type: 'Ritorno sfalsato', text: summary });
    }

    return {
      dayLessons,
      activeAttendees,
      recommendedDeparture,
      lateDepartureTime,
      recommendedReturn,
      earlyReturnTime,
      firstLessonTime: minutesToTime(earliestStartMins),
      lastLessonTime: minutesToTime(latestEndMins),
      conflicts,
    };
  }, [groupLessons, selectedDay, groupMembers]);

  // --- COSTRUZIONE LISTA VIAGGI MULTI-AUTO (ANDATA & RITORNO) DEL GIORNO ---
  const dayRidesData = useMemo(() => {
    const sched = getDriverScheduleForDay(selectedDay);
    const extrasForDay = activeGroup.extraRides?.[selectedDay] || {
      outbound: [],
      inbound: [],
    };
    const totalPresent = dayInsights.activeAttendees.length;
    const presentIds = dayInsights.activeAttendees.map((a) => a.user.id);

    // Costruisce le auto per una direzione ('outbound' | 'inbound')
    const buildDirectionRides = (direction) => {
      const primaryDriver =
        direction === 'outbound' ? sched.outboundDriver : sched.inboundDriver;
      const defaultTime =
        direction === 'outbound'
          ? dayInsights.recommendedDeparture || '08:15'
          : dayInsights.recommendedReturn || '17:15';

      const rides = [];

      // 1. Auto #1 Principale (da coda circolare / scambio / override)
      if (primaryDriver) {
        rides.push({
          id: `auto-${selectedDay}-${direction}-0`,
          driverId: primaryDriver.id,
          driver: primaryDriver,
          time: defaultTime,
          seats: primaryDriver.seats || 4,
          label:
            sched.status === 'swapped'
              ? 'Auto #1 • Turno Scambiato'
              : sched.status === 'manual'
              ? 'Auto #1 • Volontario'
              : 'Auto #1 • Turno Coda Fissa',
          isExtra: false,
          statusBadge: sched.status,
        });
      }

      // 2. Auto Extra aggiunte per quel giorno/direzione (Auto #2, Auto #3...)
      const dirExtras = extrasForDay[direction] || [];
      dirExtras.forEach((ext, i) => {
        const drv = users.find((u) => u.id === ext.driverId);
        if (drv) {
          rides.push({
            id: ext.id,
            driverId: drv.id,
            driver: drv,
            time: ext.time,
            seats: ext.seats || drv.seats || 4,
            label: ext.label || `Auto #${i + 2} • Viaggio Extra`,
            isExtra: true,
            statusBadge: 'extra',
          });
        }
      });

      // 3. Calcolo prenotazioni / assegnazione automatica intelligente dei posti
      const bookings = activeGroup.seatBookings || {};
      const assignedByRide = {};
      rides.forEach((r) => {
        assignedByRide[r.id] = [];
      });

      // Prima assegniamo ogni guidatore alla propria auto se presente oggi
      rides.forEach((r) => {
        if (
          presentIds.includes(r.driverId) &&
          !assignedByRide[r.id].includes(r.driverId)
        ) {
          assignedByRide[r.id].push(r.driverId);
        }
      });

      // Poi assegnamo i passeggeri che hanno scelto esplicitamente un'auto
      const unassignedPresent = [];
      presentIds.forEach((uid) => {
        // Se è già guidatore di una delle auto di questa tratta, è già assegnato
        const drivingRide = rides.find((r) => r.driverId === uid);
        if (drivingRide) return;

        const chosenRideId = bookings[`${selectedDay}_${direction}_${uid}`];
        if (chosenRideId && assignedByRide[chosenRideId]) {
          const targetRide = rides.find((r) => r.id === chosenRideId);
          const maxTotal = (targetRide?.seats || 4) + 1; // posti passeggeri + guidatore
          if (assignedByRide[chosenRideId].length < maxTotal) {
            assignedByRide[chosenRideId].push(uid);
            return;
          }
        }
        unassignedPresent.push(uid);
      });

      // Infine distribuiamo automaticamente gli studenti non ancora assegnati sulle auto con posti liberi
      unassignedPresent.forEach((uid) => {
        const userSched = dayInsights.activeAttendees.find(
          (a) => a.user.id === uid
        );
        // Preferenza oraria: se ci sono più auto, abbina quella con orario più vicino
        const sortedRides = [...rides].sort((a, b) => {
          const targetRef =
            direction === 'outbound'
              ? minutesToTime(
                  Math.max(
                    0,
                    timeToMinutes(userSched?.firstStart || '09:00') - 45
                  )
                )
              : minutesToTime(
                  timeToMinutes(userSched?.lastEnd || '17:00') + 15
                );
          return (
            Math.abs(timeToMinutes(a.time) - timeToMinutes(targetRef)) -
            Math.abs(timeToMinutes(b.time) - timeToMinutes(targetRef))
          );
        });

        for (const r of sortedRides) {
          const maxTotal = (r.seats || 4) + 1;
          if (assignedByRide[r.id].length < maxTotal) {
            assignedByRide[r.id].push(uid);
            break;
          }
        }
      });

      const enrichedRides = rides.map((r) => {
        const occupantsIds = assignedByRide[r.id] || [];
        const occupants = occupantsIds
          .map((id) => users.find((u) => u.id === id))
          .filter(Boolean);
        const maxTotalSeats = (r.seats || 4) + 1; // guidatore + N passeggeri
        return {
          ...r,
          occupants,
          maxTotalSeats,
          freeSeats: Math.max(0, maxTotalSeats - occupants.length),
        };
      });

      const totalCapacity = enrichedRides.reduce(
        (acc, r) => acc + r.maxTotalSeats,
        0
      );
      const allAssignedIds = new Set(
        enrichedRides.flatMap((r) => r.occupants.map((o) => o.id))
      );
      const strandedUsers = dayInsights.activeAttendees
        .map((a) => a.user)
        .filter((u) => !allAssignedIds.has(u.id));

      return {
        rides: enrichedRides,
        totalCapacity,
        totalPresent,
        strandedUsers,
        needsExtraCar: totalPresent > totalCapacity,
      };
    };

    const outbound = buildDirectionRides('outbound');
    const inbound = buildDirectionRides('inbound');

    // Suggerisci il prossimo guidatore disponibile nella coda circolare per una 2ª auto
    const activeDriverIds = new Set([
      ...outbound.rides.map((r) => r.driverId),
      ...inbound.rides.map((r) => r.driverId),
    ]);
    const nextSuggestedDriver =
      groupDrivers.find((d) => !activeDriverIds.has(d.id)) ||
      groupDrivers.find((d) => d.id !== sched.outboundDriver?.id) ||
      null;

    return {
      outbound,
      inbound,
      nextSuggestedDriver,
      recommendedCarsCount: Math.max(1, Math.ceil(totalPresent / 5)),
    };
  }, [activeGroup, selectedDay, dayInsights, users, groupDrivers]);

  // --- HANDLERS PRESENZE ---
  const toggleLessonAttendance = (lessonId) => {
    setLessons((prev) =>
      prev.map((l) => {
        if (l.id !== lessonId) return l;
        const isAttending = l.attendees.includes(currentUser.id);
        const updated = isAttending
          ? l.attendees.filter((id) => id !== currentUser.id)
          : [...l.attendees, currentUser.id];
        return { ...l, attendees: updated };
      })
    );
  };

  const setAbsentAllDay = () => {
    setLessons((prev) =>
      prev.map((l) =>
        l.groupId === activeGroup.id && l.dayIndex === selectedDay
          ? {
              ...l,
              attendees: l.attendees.filter((id) => id !== currentUser.id),
            }
          : l
      )
    );
    pushNotification(
      'attendance',
      'Assenza Giornaliera',
      `${currentUser.shortName} si è segnato/a assente per tutto ${WEEK_DAYS[selectedDay].full}.`
    );
    triggerToast(`Segnato assente per ${WEEK_DAYS[selectedDay].full}`, 'info');
  };

  const setPresentAllDay = () => {
    setLessons((prev) =>
      prev.map((l) =>
        l.groupId === activeGroup.id &&
        l.dayIndex === selectedDay &&
        !l.cancelled
          ? {
              ...l,
              attendees: l.attendees.includes(currentUser.id)
                ? l.attendees
                : [...l.attendees, currentUser.id],
            }
          : l
      )
    );
    triggerToast(
      `Confermata presenza a tutte le lezioni di ${WEEK_DAYS[selectedDay].full}`,
      'success'
    );
  };

  // --- HANDLERS TURNI, MULTI-AUTO E SCAMBI ---
  const handleSelectAutonomousDriver = (dayIdx, direction, driverId) => {
    const currentSchedule = getDriverScheduleForDay(dayIdx);
    const nextOverride = {
      outbound:
        direction === 'outbound' || direction === 'both'
          ? driverId
          : currentSchedule.outboundDriver?.id,
      inbound:
        direction === 'inbound' || direction === 'both'
          ? driverId
          : currentSchedule.inboundDriver?.id,
    };

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id
          ? {
              ...g,
              manualOverrides: {
                ...g.manualOverrides,
                [dayIdx]: nextOverride,
              },
            }
          : g
      )
    );

    const chosenUser = users.find((u) => u.id === driverId);
    const dirText =
      direction === 'both'
        ? 'andata e ritorno'
        : direction === 'outbound'
        ? "l'andata"
        : 'il ritorno';

    pushNotification(
      'manual_drive',
      'Guidatore Scelto Autonomamente',
      `${
        chosenUser?.shortName || 'Un compagno'
      } è stato impostato per ${dirText} di ${WEEK_DAYS[dayIdx].full}.`
    );
    triggerToast(
      `${chosenUser?.shortName} impostato per ${dirText}!`,
      'success'
    );
  };

  const openOfferCarModal = (direction = 'both', suggestedTime = '') => {
    setOfferRideDirection(direction);
    setOfferRideOutboundTime(
      direction === 'outbound' && suggestedTime
        ? suggestedTime
        : dayInsights.recommendedDeparture || '08:15'
    );
    setOfferRideInboundTime(
      direction === 'inbound' && suggestedTime
        ? suggestedTime
        : dayInsights.recommendedReturn || '17:15'
    );
    setOfferRideSeats(currentUser.seats || 4);
    setOfferRideLabel('');
    // Se c'è già un'auto attiva in quel giorno, proponi di default di aggiungersi come 2ª Auto!
    const hasPrimary = Boolean(todaySchedule.outboundDriver);
    setOfferRideAsExtra(hasPrimary);
    setShowManualDriveModal(true);
  };

  const handleConfirmOfferCar = (e) => {
    e.preventDefault();
    if (!currentUser.hasCar) {
      triggerToast(
        'Attiva prima lo stato "Automunito" nel tuo profilo!',
        'warning'
      );
      return;
    }

    if (!offerRideAsExtra) {
      // Sostituisce l'Auto #1 principale (assegnazione manuale volontaria)
      const currentSchedule = getDriverScheduleForDay(selectedDay);
      const nextOverride = {
        outbound:
          offerRideDirection === 'outbound' || offerRideDirection === 'both'
            ? currentUser.id
            : currentSchedule.outboundDriver?.id,
        inbound:
          offerRideDirection === 'inbound' || offerRideDirection === 'both'
            ? currentUser.id
            : currentSchedule.inboundDriver?.id,
      };

      setGroups((prev) =>
        prev.map((g) =>
          g.id === activeGroup.id
            ? {
                ...g,
                manualOverrides: {
                  ...g.manualOverrides,
                  [selectedDay]: nextOverride,
                },
              }
            : g
        )
      );
      pushNotification(
        'manual_drive',
        'Auto #1 Assegnata Manualmente',
        `${currentUser.shortName} guida l'Auto #1 per ${WEEK_DAYS[selectedDay].full}.`
      );
      triggerToast('Hai preso il volante dell’Auto #1!', 'success');
    } else {
      // Aggiunge una 2ª / 3ª Auto nello stesso giorno per gestire più studenti o orari diversi!
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== activeGroup.id) return g;
          const dayExtras = g.extraRides?.[selectedDay] || {
            outbound: [],
            inbound: [],
          };
          const nextOutbound = [...dayExtras.outbound];
          const nextInbound = [...dayExtras.inbound];
          const nextBookings = { ...(g.seatBookings || {}) };

          if (
            offerRideDirection === 'outbound' ||
            offerRideDirection === 'both'
          ) {
            const newOutId = `ride-${Date.now()}-out`;
            nextOutbound.push({
              id: newOutId,
              driverId: currentUser.id,
              time: offerRideOutboundTime,
              seats: Number(offerRideSeats) || 4,
              label:
                offerRideLabel.trim() ||
                `Auto #${
                  nextOutbound.length + 2
                } • Partenza ${offerRideOutboundTime}`,
              isExtra: true,
            });
            nextBookings[`${selectedDay}_outbound_${currentUser.id}`] =
              newOutId;
          }

          if (
            offerRideDirection === 'inbound' ||
            offerRideDirection === 'both'
          ) {
            const newInId = `ride-${Date.now()}-in`;
            nextInbound.push({
              id: newInId,
              driverId: currentUser.id,
              time: offerRideInboundTime,
              seats: Number(offerRideSeats) || 4,
              label:
                offerRideLabel.trim() ||
                `Auto #${
                  nextInbound.length + 2
                } • Rientro ${offerRideInboundTime}`,
              isExtra: true,
            });
            nextBookings[`${selectedDay}_inbound_${currentUser.id}`] = newInId;
          }

          return {
            ...g,
            extraRides: {
              ...(g.extraRides || {}),
              [selectedDay]: {
                outbound: nextOutbound,
                inbound: nextInbound,
              },
            },
            seatBookings: nextBookings,
          };
        })
      );

      const dirLabel =
        offerRideDirection === 'both'
          ? `Andata (${offerRideOutboundTime}) e Ritorno (${offerRideInboundTime})`
          : offerRideDirection === 'outbound'
          ? `Andata (${offerRideOutboundTime})`
          : `Ritorno (${offerRideInboundTime})`;

      pushNotification(
        'manual_drive',
        'Nuova Auto Aggiunta al Viaggio',
        `${currentUser.shortName} ha messo a disposizione una macchina extra per ${WEEK_DAYS[selectedDay].full} (${dirLabel}).`
      );
      triggerToast(`Auto extra aggiunta (${dirLabel})!`, 'success');
    }

    setShowManualDriveModal(false);
  };

  const handleRemoveExtraRide = (direction, rideId) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== activeGroup.id) return g;
        const dayExtras = g.extraRides?.[selectedDay] || {
          outbound: [],
          inbound: [],
        };
        return {
          ...g,
          extraRides: {
            ...(g.extraRides || {}),
            [selectedDay]: {
              ...dayExtras,
              [direction]: dayExtras[direction].filter((r) => r.id !== rideId),
            },
          },
        };
      })
    );
    triggerToast('Auto extra rimossa dal programma del giorno', 'info');
  };

  const handleBookSeatOnRide = (direction, rideId) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== activeGroup.id) return g;
        return {
          ...g,
          seatBookings: {
            ...(g.seatBookings || {}),
            [`${selectedDay}_${direction}_${currentUser.id}`]: rideId,
          },
        };
      })
    );
    triggerToast(
      `Posto confermato per ${
        direction === 'outbound' ? "l'Andata" : 'il Ritorno'
      }!`,
      'success'
    );
  };

  const resetManualOverride = (dayIdx) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== activeGroup.id) return g;
        const copy = { ...g.manualOverrides };
        delete copy[dayIdx];
        return { ...g, manualOverrides: copy };
      })
    );
    triggerToast('Ripristinata rotazione automatica per questo giorno', 'info');
  };

  const openSwapModalForDay = (dayIdx) => {
    const otherDrivers = groupDrivers.filter((d) => d.id !== currentUser.id);
    if (otherDrivers.length === 0) {
      triggerToast(
        'Servono almeno 2 utenti automuniti nel gruppo per scambiare.',
        'warning'
      );
      return;
    }
    const defaultPartner = otherDrivers[0];
    // Trova il prossimo giorno in cui tocca a defaultPartner
    const partnerNextDay =
      WEEK_DAYS.find((d) => {
        if (d.index === dayIdx) return false;
        const sched = getDriverScheduleForDay(d.index);
        return sched.outboundDriver?.id === defaultPartner.id;
      })?.index ?? (dayIdx + 1) % 6;

    setSwapTargetDay(dayIdx);
    setSwapPartnerId(defaultPartner.id);
    setSwapPartnerDay(partnerNextDay);
    setSwapReason('');
    setShowSwapModal(true);
  };

  const submitSwapRequest = (instantExecute = false) => {
    if (!swapPartnerId || swapTargetDay === null) return;
    const partner = users.find((u) => u.id === swapPartnerId);

    if (instantExecute) {
      // Esegue immediatamente lo scambio nella logica del gruppo (utile per test rapido)
      const newSwap = {
        id: `sw-${Date.now()}`,
        dayA: swapTargetDay,
        userA: currentUser.id,
        dayB: Number(swapPartnerDay),
        userB: swapPartnerId,
      };
      setGroups((prev) =>
        prev.map((g) =>
          g.id === activeGroup.id
            ? { ...g, approvedSwaps: [...g.approvedSwaps, newSwap] }
            : g
        )
      );
      pushNotification(
        'swap_done',
        'Scambio Turni Eseguito',
        `${currentUser.shortName} (${WEEK_DAYS[swapTargetDay].short}) e ${partner?.shortName} (${WEEK_DAYS[swapPartnerDay].short}) hanno scambiato i turni. Coda ciclica invariata.`
      );
      triggerToast(
        'Scambio turni applicato senza alterare la coda!',
        'success'
      );
    } else {
      // Crea richiesta di scambio in attesa di approvazione
      const reqId = `req-${Date.now()}`;
      const newReq = {
        id: reqId,
        fromUserId: currentUser.id,
        toUserId: swapPartnerId,
        fromDay: swapTargetDay,
        toDay: Number(swapPartnerDay),
        reason: swapReason || 'Impegno personale, possiamo scambiarci i turni?',
        status: 'pending',
      };
      setGroups((prev) =>
        prev.map((g) =>
          g.id === activeGroup.id
            ? { ...g, swapRequests: [newReq, ...g.swapRequests] }
            : g
        )
      );
      pushNotification(
        'swap_request',
        'Nuova Richiesta di Scambio',
        `${currentUser.shortName} chiede a ${partner?.shortName} di scambiare ${WEEK_DAYS[swapTargetDay].full} con ${WEEK_DAYS[swapPartnerDay].full}.`,
        { swapRequestId: reqId }
      );
      triggerToast(`Richiesta inviata a ${partner?.shortName}!`, 'success');
    }
    setShowSwapModal(false);
  };

  const respondToSwapRequest = (reqId, accept) => {
    const req = activeGroup.swapRequests.find((r) => r.id === reqId);
    if (!req) return;

    const fromUser = users.find((u) => u.id === req.fromUserId);
    const toUser = users.find((u) => u.id === req.toUserId);

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== activeGroup.id) return g;
        const updatedReqs = g.swapRequests.map((r) =>
          r.id === reqId
            ? { ...r, status: accept ? 'accepted' : 'rejected' }
            : r
        );
        const updatedSwaps = accept
          ? [
              ...g.approvedSwaps,
              {
                id: `sw-${Date.now()}`,
                dayA: req.fromDay,
                userA: req.fromUserId,
                dayB: req.toDay,
                userB: req.toUserId,
              },
            ]
          : g.approvedSwaps;
        return {
          ...g,
          swapRequests: updatedReqs,
          approvedSwaps: updatedSwaps,
        };
      })
    );

    // Segna notifiche collegate come lette
    setNotifications((prev) =>
      prev.map((n) => (n.swapRequestId === reqId ? { ...n, read: true } : n))
    );

    pushNotification(
      accept ? 'swap_done' : 'info',
      accept ? 'Scambio Accettato!' : 'Scambio Rifiutato',
      accept
        ? `${toUser?.shortName} ha accettato lo scambio con ${
            fromUser?.shortName
          } (${WEEK_DAYS[req.fromDay].short} ⇄ ${WEEK_DAYS[req.toDay].short}).`
        : `${toUser?.shortName} non può accettare lo scambio proposto da ${fromUser?.shortName}.`
    );

    triggerToast(
      accept ? 'Scambio turno confermato!' : 'Richiesta di scambio rifiutata.',
      accept ? 'success' : 'info'
    );
  };

  const moveRotationMember = (index, direction) => {
    const newOrder = [...activeGroup.rotationOrder];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    [newOrder[index], newOrder[targetIdx]] = [
      newOrder[targetIdx],
      newOrder[index],
    ];

    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id ? { ...g, rotationOrder: newOrder } : g
      )
    );
    triggerToast('Ordine coda circolare aggiornato', 'info');
  };

  // --- HANDLERS CALENDARIO & LEZIONI ---
  const handleSaveLesson = (e) => {
    e.preventDefault();
    if (!lessonForm.title.trim()) return;

    if (editingLessonId) {
      setLessons((prev) =>
        prev.map((l) =>
          l.id === editingLessonId
            ? {
                ...l,
                title: lessonForm.title,
                dayIndex: Number(lessonForm.dayIndex),
                startTime: lessonForm.startTime,
                endTime: lessonForm.endTime,
                room: lessonForm.room || 'Aula da definire',
              }
            : l
        )
      );
      pushNotification(
        'lesson_update',
        'Orario Lezione Modificato',
        `${currentUser.shortName} ha aggiornato "${lessonForm.title}" (${
          WEEK_DAYS[lessonForm.dayIndex].short
        } ${lessonForm.startTime}-${lessonForm.endTime}).`
      );
      triggerToast('Lezione aggiornata!', 'success');
      setEditingLessonId(null);
    } else {
      const newLesson = {
        id: `l-${Date.now()}`,
        groupId: activeGroup.id,
        dayIndex: Number(lessonForm.dayIndex),
        title: lessonForm.title,
        startTime: lessonForm.startTime,
        endTime: lessonForm.endTime,
        room: lessonForm.room || 'Polo Universitario',
        attendees: [...activeGroup.memberIds],
        cancelled: false,
      };
      setLessons((prev) => [...prev, newLesson]);
      pushNotification(
        'lesson_new',
        'Nuova Lezione Aggiunta',
        `${currentUser.shortName} ha aggiunto "${newLesson.title}" il ${
          WEEK_DAYS[newLesson.dayIndex].full
        } alle ${newLesson.startTime}.`
      );
      triggerToast('Nuova lezione aggiunta al calendario!', 'success');
    }

    setLessonForm({
      title: '',
      dayIndex: selectedDay,
      startTime: '09:00',
      endTime: '11:00',
      room: '',
    });
  };

  const toggleCancelLesson = (lesson) => {
    const nextState = !lesson.cancelled;
    setLessons((prev) =>
      prev.map((l) => (l.id === lesson.id ? { ...l, cancelled: nextState } : l))
    );
    pushNotification(
      'lesson_cancel',
      nextState ? '⚠️ Lezione Cancellata!' : 'Lezione Ripristinata',
      nextState
        ? `${currentUser.shortName} ha segnalato la cancellazione di "${
            lesson.title
          }" (${WEEK_DAYS[lesson.dayIndex].short} ${lesson.startTime}).`
        : `"${lesson.title}" è stata ripristinata in calendario.`
    );
    triggerToast(
      nextState
        ? 'Lezione annullata e gruppo avvisato!'
        : 'Lezione ripristinata',
      nextState ? 'warning' : 'success'
    );
  };

  const deleteLesson = (lesson) => {
    setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    triggerToast(`Eliminata: ${lesson.title}`, 'info');
  };

  const handleICSFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === 'string') {
        const imported = parseICSContent(
          text,
          activeGroup.id,
          activeGroup.memberIds
        );
        if (imported.length > 0) {
          setLessons((prev) => [...prev, ...imported]);
          pushNotification(
            'ics_import',
            'Calendario .ics Importato',
            `${currentUser.shortName} ha importato ${imported.length} lezioni da "${file.name}".`
          );
          triggerToast(
            `Importate ${imported.length} lezioni dal file .ics!`,
            'success'
          );
        } else {
          triggerToast(
            'Nessun evento VEVENT valido trovato nel file .ics.',
            'warning'
          );
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const simulateEsse3Import = () => {
    const sampleICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cineca Esse3//University Planner//IT
BEGIN:VEVENT
DTSTART:20261127T140000
DTEND:20261127T160000
SUMMARY:Ingegneria del Software (Esse3)
LOCATION:Aula Azzurra - Polo Monte Dago
END:VEVENT
BEGIN:VEVENT
DTSTART:20261128T093000
DTEND:20261128T123000
SUMMARY:Tutorato Analisi & Calcolo
LOCATION:Aula Studio 2
END:VEVENT
END:VCALENDAR`;

    const imported = parseICSContent(
      sampleICS,
      activeGroup.id,
      activeGroup.memberIds
    );
    setLessons((prev) => [...prev, ...imported]);
    pushNotification(
      'ics_import',
      'Sincronizzazione Esse3 Completata',
      `${currentUser.shortName} ha sincronizzato ${imported.length} nuove lezioni dal feed Cineca/Esse3.`
    );
    triggerToast(
      'Sincronizzate 2 nuove lezioni da Esse3 (Venerdì e Sabato)!',
      'success'
    );
  };

  // --- HANDLERS PROFILO & GRUPPI ---
  const toggleCurrentUserCar = () => {
    const nextHasCar = !currentUser.hasCar;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              hasCar: nextHasCar,
              carModel: nextHasCar ? u.carModel || 'Auto Personale' : '',
              seats: nextHasCar ? 4 : 0,
            }
          : u
      )
    );

    // Aggiorna coda circolare del gruppo attivo
    setGroups((prev) =>
      prev.map((g) => {
        if (!g.memberIds.includes(currentUser.id)) return g;
        const inOrder = g.rotationOrder.includes(currentUser.id);
        let nextOrder = [...g.rotationOrder];
        if (nextHasCar && !inOrder) nextOrder.push(currentUser.id);
        if (!nextHasCar && inOrder)
          nextOrder = nextOrder.filter((id) => id !== currentUser.id);
        return { ...g, rotationOrder: nextOrder };
      })
    );

    triggerToast(
      nextHasCar
        ? 'Sei ora Automunito e inserito nella coda turni!'
        : 'Passato a Solo Passeggero (rimosso dalla coda guida)',
      'info'
    );
  };

  const changeUserColor = (colorKey) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, color: colorKey } : u))
    );
    triggerToast(
      `Colore profilo aggiornato a ${USER_COLORS[colorKey].name}`,
      'success'
    );
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const code = `${newGroupName.slice(0, 3).toUpperCase()}-${Math.floor(
      100 + Math.random() * 899
    )}`;
    const newGrp = {
      id: `g-${Date.now()}`,
      name: newGroupName.trim(),
      route: newGroupRoute.trim() || 'Tratta Universitaria Condivisa',
      inviteCode: code,
      memberIds: [currentUser.id],
      rotationOrder: currentUser.hasCar ? [currentUser.id] : [],
      manualOverrides: {},
      approvedSwaps: [],
      swapRequests: [],
    };
    setGroups((prev) => [...prev, newGrp]);
    setActiveGroupId(newGrp.id);
    setNewGroupName('');
    setNewGroupRoute('');
    setShowNewGroupModal(false);
    triggerToast(`Gruppo "${newGrp.name}" creato! Codice: ${code}`, 'success');
  };

  const handleJoinGroupByCode = (e) => {
    e.preventDefault();
    const clean = joinCodeInput.trim().toUpperCase();
    const target = groups.find((g) => g.inviteCode.toUpperCase() === clean);
    if (!target) {
      triggerToast(
        'Codice invito non valido. Prova con JESI-AN26 o TIR-MED99',
        'warning'
      );
      return;
    }
    if (!target.memberIds.includes(currentUser.id)) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === target.id
            ? {
                ...g,
                memberIds: [...g.memberIds, currentUser.id],
                rotationOrder: currentUser.hasCar
                  ? [...g.rotationOrder, currentUser.id]
                  : g.rotationOrder,
              }
            : g
        )
      );
    }
    setActiveGroupId(target.id);
    setJoinCodeInput('');
    setShowNewGroupModal(false);
    triggerToast(`Sei entrato nel gruppo "${target.name}"!`, 'success');
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    if (!regName.trim()) return;
    const parts = regName.trim().split(' ');
    const initials = parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');
    const newUser = {
      id: `u-${Date.now()}`,
      name: regName.trim(),
      shortName: parts[0],
      email: `${parts[0].toLowerCase()}@studenti.univpm.it`,
      avatar: initials || 'ST',
      color: regColor,
      hasCar: regHasCar,
      carModel: regHasCar ? regCarModel || 'Auto Compatta' : '',
      seats: regHasCar ? 4 : 0,
    };
    setUsers((prev) => [...prev, newUser]);
    // Aggiungi al gruppo attivo
    setGroups((prev) =>
      prev.map((g) =>
        g.id === activeGroup.id
          ? {
              ...g,
              memberIds: [...g.memberIds, newUser.id],
              rotationOrder: newUser.hasCar
                ? [...g.rotationOrder, newUser.id]
                : g.rotationOrder,
            }
          : g
      )
    );
    setCurrentUserId(newUser.id);
    setRegName('');
    setRegCarModel('');
    setShowAuthModal(false);
    triggerToast(
      `Benvenuto/a ${newUser.shortName}! Aggiunto al gruppo attivo.`,
      'success'
    );
  };

  // --- TURNO CORRENTE DEL GIORNO SELEZIONATO ---
  const todaySchedule = getDriverScheduleForDay(selectedDay);
  const currentUserColor = USER_COLORS[currentUser.color] || USER_COLORS.blue;

  // --- COMPONENTE AVATAR UTENTE COLORATO ---
  const UserBadge = ({ user, size = 'md', showName = false }) => {
    if (!user) return null;
    const c = USER_COLORS[user.color] || USER_COLORS.blue;
    const dim =
      size === 'xs'
        ? 'w-6 h-6 text-[10px]'
        : size === 'sm'
        ? 'w-7 h-7 text-xs'
        : size === 'lg'
        ? 'w-11 h-11 text-sm'
        : 'w-9 h-9 text-xs';
    return (
      <div className="inline-flex items-center gap-1.5">
        <span
          className={`${dim} ${c.bg} ${c.textOnSolid} rounded-full font-bold inline-flex items-center justify-center shadow-sm ring-2 ring-white shrink-0`}
          title={user.name}
        >
          {user.avatar}
        </span>
        {showName && (
          <span className="font-semibold text-slate-800 text-sm">
            {user.shortName}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-200/80 flex justify-center items-start sm:py-4 font-sans text-slate-900">
      {/* MOBILE-FIRST APP CONTAINER (iOS / Material 3 App Frame su Desktop, Fullscreen su Mobile) */}
      <div className="w-full max-w-[440px] min-h-screen sm:min-h-[840px] sm:max-h-[900px] bg-slate-50 sm:rounded-[36px] sm:shadow-2xl sm:border-[6px] sm:border-slate-900 flex flex-col relative overflow-hidden">
        {/* TOP QUICK-SWITCH BAR (Per testare istantaneamente i vari studenti del gruppo) */}
        <div className="bg-slate-900 text-white px-3.5 py-2 flex items-center justify-between text-xs z-30">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pr-2">
            <span className="text-slate-400 font-medium shrink-0 mr-0.5">
              Utente:
            </span>
            {users.map((u) => {
              const c = USER_COLORS[u.color] || USER_COLORS.blue;
              const isSelected = u.id === currentUser.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    setCurrentUserId(u.id);
                    triggerToast(`Profilo attivo: ${u.name}`, 'info');
                  }}
                  className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all shrink-0 ${
                    isSelected
                      ? `${c.bg} text-white font-bold shadow-sm scale-105`
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-white' : c.bg
                    }`}
                  />
                  <span>{u.shortName}</span>
                  {u.hasCar && <Car className="w-2.5 h-2.5 opacity-80" />}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setShowAuthModal(true)}
            className="ml-1 p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
            title="Login / Nuovo Studente"
          >
            <UserPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* APP HEADER: LOGO, GROUP SELECTOR & NOTIFICATIONS */}
        <header className="bg-white border-b border-slate-200/80 px-4 pt-3.5 pb-3 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-2">
            {/* Brand + Selettore Gruppo */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <select
                    value={activeGroup.id}
                    onChange={(e) => setActiveGroupId(e.target.value)}
                    className="font-extrabold text-slate-900 text-sm bg-transparent focus:outline-none truncate max-w-[195px] cursor-pointer"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowNewGroupModal(true)}
                    className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="Crea o unisciti a un gruppo"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                  <Navigation className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                  {activeGroup.route}
                </p>
              </div>
            </div>

            {/* Notifiche Bell */}
            <button
              onClick={() => setShowNotifDrawer(true)}
              className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors shrink-0"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Barra Partecipanti del Gruppo con Pallini Colorati */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {groupMembers.map((m) => {
                const mc = USER_COLORS[m.color] || USER_COLORS.blue;
                return (
                  <div
                    key={m.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${mc.bgSoft} ${mc.text} border ${mc.border}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${mc.bg}`} />
                    <span>{m.shortName}</span>
                    {m.hasCar && <Car className="w-2.5 h-2.5 opacity-75" />}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(activeGroup.inviteCode);
                triggerToast(
                  `Codice invito copiato: ${activeGroup.inviteCode}`,
                  'success'
                );
              }}
              className="text-[10px] font-mono font-bold text-slate-500 hover:text-blue-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 ml-1"
              title="Copia codice invito"
            >
              <Copy className="w-2.5 h-2.5" />
              {activeGroup.inviteCode}
            </button>
          </div>
        </header>

        {/* TOAST FEEDBACK FLOTTANTE */}
        {toast && (
          <div className="mx-4 mt-2 px-3.5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-medium shadow-lg flex items-center justify-between z-40">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{toast.msg}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4">
          {/* ===================================================================== */}
          {/* TAB 1: DASHBOARD GIORNALIERA & SETTIMANALE                            */}
          {/* ===================================================================== */}
          {activeTab === 'dashboard' && (
            <>
              {/* SELETTORE GIORNI DELLA SETTIMANA (Con pallino guidatore per ogni giorno) */}
              <div className="grid grid-cols-6 gap-1.5">
                {WEEK_DAYS.map((day) => {
                  const isSelected = selectedDay === day.index;
                  const sched = getDriverScheduleForDay(day.index);
                  const drvColor = sched.outboundDriver
                    ? USER_COLORS[sched.outboundDriver.color]
                    : null;
                  const extraCount =
                    (activeGroup.extraRides?.[day.index]?.outbound?.length ||
                      0) +
                    (activeGroup.extraRides?.[day.index]?.inbound?.length || 0);
                  const dayLessonsCount = groupLessons.filter(
                    (l) => l.dayIndex === day.index && !l.cancelled
                  ).length;

                  return (
                    <button
                      key={day.index}
                      onClick={() => setSelectedDay(day.index)}
                      className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-between transition-all border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.03]'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {day.short}
                      </span>
                      <span className="text-xs font-extrabold my-0.5">
                        {day.dateLabel.split(' ')[0]}
                      </span>
                      {/* Indicatore colore guidatore/i */}
                      <div className="h-3 flex items-center justify-center gap-0.5">
                        {dayLessonsCount === 0 ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        ) : drvColor ? (
                          <>
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${drvColor.bg} ring-1 ring-white`}
                              title={`Auto #1: ${sched.outboundDriver?.shortName}`}
                            />
                            {extraCount > 0 && (
                              <span
                                className="text-[9px] font-extrabold text-amber-500"
                                title="Più auto attive"
                              >
                                +
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* CARD RIEPILOGO VIAGGI MULTI-AUTO (ANDATA & RITORNO) */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {WEEK_DAYS[selectedDay].full} •{' '}
                      {WEEK_DAYS[selectedDay].dateLabel}
                    </span>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      Viaggi del Giorno ({dayInsights.activeAttendees.length}{' '}
                      presenti)
                    </h2>
                  </div>

                  {/* Badge Fabbisogno Auto + Modalità A Giro / Scelta */}
                  {dayInsights.activeAttendees.length > 0 && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                        dayRidesData.recommendedCarsCount > 1
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Car className="w-3 h-3" />
                      {dayRidesData.recommendedCarsCount}{' '}
                      {dayRidesData.recommendedCarsCount > 1
                        ? 'Auto consigliate'
                        : 'Auto suff.'}
                    </span>
                  )}
                </div>

                {/* SELETTORE RAPIDO MODALITÀ: A GIRO VS SCELTA AUTONOMA (CON CONSIGLIO MENO VOLTE) */}
                {groupDrivers.length > 0 && (
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-600">
                        Modalità Auto #1:{' '}
                        <strong className="text-slate-900">
                          {todaySchedule.status === 'manual'
                            ? 'Scelta Autonoma'
                            : 'A Giro'}
                        </strong>
                      </span>

                      <div className="flex items-center gap-1">
                        {todaySchedule.status === 'manual' && (
                          <button
                            onClick={() => resetManualOverride(selectedDay)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold flex items-center gap-1"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Usa A Giro
                          </button>
                        )}
                        {recommendedLeastDriver && (
                          <button
                            onClick={() =>
                              handleSelectAutonomousDriver(
                                selectedDay,
                                'both',
                                recommendedLeastDriver.id
                              )
                            }
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] font-extrabold flex items-center gap-1"
                            title="Assegna a chi ha preso la macchina meno volte"
                          >
                            <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
                            Consigliato: {recommendedLeastDriver.shortName} (
                            {driverDriveCounts[recommendedLeastDriver.id]
                              ?.total ?? 0}
                            x)
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scelta autonoma diretta del guidatore Auto #1 */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                      <span className="text-[10px] font-bold text-slate-400 shrink-0">
                        Scegli chi guida:
                      </span>
                      {groupDrivers.map((drv) => {
                        const dc = USER_COLORS[drv.color] || USER_COLORS.blue;
                        const count = driverDriveCounts[drv.id]?.total ?? 0;
                        const isCurrentOut =
                          todaySchedule.outboundDriver?.id === drv.id;
                        const isLeast = recommendedLeastDriver?.id === drv.id;
                        return (
                          <button
                            key={drv.id}
                            onClick={() =>
                              handleSelectAutonomousDriver(
                                selectedDay,
                                'both',
                                drv.id
                              )
                            }
                            className={`px-2 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 shrink-0 border transition-all ${
                              isCurrentOut && todaySchedule.status === 'manual'
                                ? `${dc.bg} text-white border-transparent shadow-xs`
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isCurrentOut &&
                                todaySchedule.status === 'manual'
                                  ? 'bg-white'
                                  : dc.bg
                              }`}
                            />
                            <span>{drv.shortName}</span>
                            <span
                              className={`px-1 rounded text-[9px] ${
                                isCurrentOut &&
                                todaySchedule.status === 'manual'
                                  ? 'bg-white/20 text-white'
                                  : isLeast
                                  ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {count}x
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {dayInsights.activeAttendees.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-1">
                    <p className="text-sm font-bold text-slate-700">
                      Nessun partecipante confermato
                    </p>
                    <p className="text-xs text-slate-500">
                      Spunta almeno una lezione qui sotto per calcolare orari e
                      auto.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* ALERT CAPIENZA INSUFFICIENTE (Es. 6 presenti ma solo 5 posti auto attivi) */}
                    {(dayRidesData.outbound.needsExtraCar ||
                      dayRidesData.inbound.needsExtraCar) && (
                      <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="text-xs font-extrabold text-rose-900">
                              Servono più posti auto!
                            </p>
                            <p className="text-[11px] text-rose-800 leading-snug">
                              {dayInsights.activeAttendees.length} studenti
                              presenti oggi: aggiungi una 2ª macchina
                              {dayRidesData.nextSuggestedDriver
                                ? ` (prossimo in coda: ${dayRidesData.nextSuggestedDriver.shortName})`
                                : ''}
                              .
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => openOfferCarModal('both')}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-extrabold shrink-0 shadow-xs"
                        >
                          + 2ª Auto
                        </button>
                      </div>
                    )}

                    {/* ALERT INCASTRO ORARIO SFALSATO CON AZIONE RAPIDA */}
                    {dayInsights.conflicts.length > 0 && (
                      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/90 space-y-1.5">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 flex-1">
                            <p className="text-xs font-extrabold text-amber-900">
                              Orari Sfalsati Rilevati (Multi-Viaggio)
                            </p>
                            {dayInsights.conflicts.map((c, idx) => (
                              <p
                                key={idx}
                                className="text-[11px] text-amber-800 leading-snug"
                              >
                                <strong>{c.type}:</strong> {c.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SEZIONE ANDATA (1 o più auto attive) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                          <Navigation className="w-3 h-3" /> Viaggi Andata (
                          {dayRidesData.outbound.rides.length}{' '}
                          {dayRidesData.outbound.rides.length === 1
                            ? 'auto'
                            : 'auto'}
                          )
                        </span>
                        <button
                          onClick={() =>
                            openOfferCarModal(
                              'outbound',
                              dayInsights.lateDepartureTime
                            )
                          }
                          className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
                        >
                          <Plus className="w-3 h-3" /> Aggiungi Auto Andata
                        </button>
                      </div>

                      {dayRidesData.outbound.rides.map((ride) => {
                        const dc =
                          USER_COLORS[ride.driver.color] || USER_COLORS.blue;
                        const isUserOnThisRide = ride.occupants.some(
                          (o) => o.id === currentUser.id
                        );
                        const isUserPresentToday =
                          dayInsights.activeAttendees.some(
                            (a) => a.user.id === currentUser.id
                          );

                        return (
                          <div
                            key={ride.id}
                            className={`p-3 rounded-2xl border transition-all space-y-2 ${
                              isUserOnThisRide
                                ? 'bg-blue-50/40 border-blue-200'
                                : 'bg-slate-50 border-slate-200/80'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <UserBadge user={ride.driver} size="sm" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-slate-900 truncate">
                                      {ride.driver.shortName}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-extrabold text-blue-700">
                                      Ore {ride.time}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 truncate">
                                    {ride.label} •{' '}
                                    {ride.driver.carModel || 'Auto'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    ride.freeSeats === 0
                                      ? 'bg-rose-100 text-rose-700'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {ride.occupants.length}/{ride.maxTotalSeats}{' '}
                                  posti
                                </span>
                                {ride.isExtra && (
                                  <button
                                    onClick={() =>
                                      handleRemoveExtraRide('outbound', ride.id)
                                    }
                                    className="p-1 rounded-lg bg-slate-200/70 hover:bg-rose-100 text-slate-600 hover:text-rose-600"
                                    title="Rimuovi auto extra"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Occupanti a bordo + Pulsante Sali su quest'auto */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                              <div className="flex items-center gap-1 flex-wrap">
                                {ride.occupants.map((occ) => {
                                  const oc =
                                    USER_COLORS[occ.color] || USER_COLORS.blue;
                                  return (
                                    <span
                                      key={occ.id}
                                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${oc.bgSoft} ${oc.text}`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full ${oc.bg}`}
                                      />
                                      {occ.shortName}
                                    </span>
                                  );
                                })}
                              </div>

                              {isUserPresentToday &&
                                !isUserOnThisRide &&
                                ride.freeSeats > 0 && (
                                  <button
                                    onClick={() =>
                                      handleBookSeatOnRide('outbound', ride.id)
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-extrabold shrink-0"
                                  >
                                    Sali qui
                                  </button>
                                )}
                              {isUserOnThisRide && (
                                <span
                                  className={`text-[10px] font-extrabold ${dc.text}`}
                                >
                                  ✓ A bordo
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* SEZIONE RITORNO (1 o più auto attive, es. rientro anticipato vs serale) */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                          <Navigation className="w-3 h-3 rotate-180" /> Viaggi
                          Ritorno ({dayRidesData.inbound.rides.length}{' '}
                          {dayRidesData.inbound.rides.length === 1
                            ? 'auto'
                            : 'auto'}
                          )
                        </span>
                        <button
                          onClick={() =>
                            openOfferCarModal(
                              'inbound',
                              dayInsights.earlyReturnTime
                            )
                          }
                          className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                        >
                          <Plus className="w-3 h-3" /> Aggiungi Auto Ritorno
                        </button>
                      </div>

                      {dayRidesData.inbound.rides.map((ride) => {
                        const dc =
                          USER_COLORS[ride.driver.color] || USER_COLORS.emerald;
                        const isUserOnThisRide = ride.occupants.some(
                          (o) => o.id === currentUser.id
                        );
                        const isUserPresentToday =
                          dayInsights.activeAttendees.some(
                            (a) => a.user.id === currentUser.id
                          );

                        return (
                          <div
                            key={ride.id}
                            className={`p-3 rounded-2xl border transition-all space-y-2 ${
                              isUserOnThisRide
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : 'bg-slate-50 border-slate-200/80'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <UserBadge user={ride.driver} size="sm" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-slate-900 truncate">
                                      {ride.driver.shortName}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-extrabold text-emerald-700">
                                      Ore {ride.time}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 truncate">
                                    {ride.label} •{' '}
                                    {ride.driver.carModel || 'Auto'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    ride.freeSeats === 0
                                      ? 'bg-rose-100 text-rose-700'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {ride.occupants.length}/{ride.maxTotalSeats}{' '}
                                  posti
                                </span>
                                {ride.isExtra && (
                                  <button
                                    onClick={() =>
                                      handleRemoveExtraRide('inbound', ride.id)
                                    }
                                    className="p-1 rounded-lg bg-slate-200/70 hover:bg-rose-100 text-slate-600 hover:text-rose-600"
                                    title="Rimuovi auto extra"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                              <div className="flex items-center gap-1 flex-wrap">
                                {ride.occupants.map((occ) => {
                                  const oc =
                                    USER_COLORS[occ.color] || USER_COLORS.blue;
                                  return (
                                    <span
                                      key={occ.id}
                                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${oc.bgSoft} ${oc.text}`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full ${oc.bg}`}
                                      />
                                      {occ.shortName}
                                    </span>
                                  );
                                })}
                              </div>

                              {isUserPresentToday &&
                                !isUserOnThisRide &&
                                ride.freeSeats > 0 && (
                                  <button
                                    onClick={() =>
                                      handleBookSeatOnRide('inbound', ride.id)
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold shrink-0"
                                  >
                                    Torna qui
                                  </button>
                                )}
                              {isUserOnThisRide && (
                                <span
                                  className={`text-[10px] font-extrabold ${dc.text}`}
                                >
                                  ✓ A bordo
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* AZIONI RAPIDE MULTI-AUTO & SCAMBIO */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openOfferCarModal('both')}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                  >
                    <Car className="w-3.5 h-3.5" />
                    Offri Auto / 2ª Macchina
                  </button>

                  <button
                    onClick={() => openSwapModalForDay(selectedDay)}
                    className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    Chiedi Scambio
                  </button>
                </div>

                {todaySchedule.status === 'manual' && (
                  <button
                    onClick={() => resetManualOverride(selectedDay)}
                    className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 underline"
                  >
                    Annulla assegnazione manuale Auto #1 e torna alla coda
                    circolare
                  </button>
                )}
              </div>

              {/* LISTA LEZIONI DEL GIORNO CON GRANULARITÀ PER SINGOLA LEZIONE */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Lezioni di {WEEK_DAYS[selectedDay].full}
                  </h3>

                  {/* Pulsante Rapido Assente / Presente tutto il giorno */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={setPresentAllDay}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    >
                      Tutte
                    </button>
                    <button
                      onClick={setAbsentAllDay}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 flex items-center gap-1 transition-colors"
                    >
                      <UserX className="w-3 h-3" /> Assente oggi
                    </button>
                  </div>
                </div>

                {groupLessons.filter((l) => l.dayIndex === selectedDay)
                  .length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/70 space-y-2">
                    <p className="text-sm font-bold text-slate-700">
                      Nessuna lezione in programma
                    </p>
                    <p className="text-xs text-slate-500">
                      Vai nella tab "Calendario" per aggiungere lezioni o
                      importare un file .ics.
                    </p>
                  </div>
                ) : (
                  groupLessons
                    .filter((l) => l.dayIndex === selectedDay)
                    .sort(
                      (a, b) =>
                        timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
                    )
                    .map((lesson) => {
                      const isUserGoing = lesson.attendees.includes(
                        currentUser.id
                      );
                      return (
                        <div
                          key={lesson.id}
                          className={`bg-white rounded-2xl p-3.5 border transition-all ${
                            lesson.cancelled
                              ? 'border-rose-200 bg-rose-50/40 opacity-75'
                              : isUserGoing
                              ? `border-l-4 ${currentUserColor.border} border-slate-200 shadow-sm`
                              : 'border-slate-200/70 opacity-85'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.startTime} - {lesson.endTime}
                                </span>
                                {lesson.cancelled && (
                                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-600 text-white">
                                    Annullata
                                  </span>
                                )}
                              </div>

                              <h4
                                className={`text-sm font-bold text-slate-900 leading-snug ${
                                  lesson.cancelled
                                    ? 'line-through text-slate-500'
                                    : ''
                                }`}
                              >
                                {lesson.title}
                              </h4>

                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                                <span className="truncate">{lesson.room}</span>
                              </p>
                            </div>

                            {/* Checkbox / Toggle Presenza Singola Lezione */}
                            {!lesson.cancelled && (
                              <button
                                onClick={() =>
                                  toggleLessonAttendance(lesson.id)
                                }
                                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                                  isUserGoing
                                    ? `${currentUserColor.bg} text-white shadow-sm`
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {isUserGoing ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />{' '}
                                    Ci sono
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" /> Partecipa
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Pallini Colorati dei Partecipanti alla Lezione */}
                          {!lesson.cancelled && (
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {lesson.attendees.length === 0 ? (
                                  <span className="text-[11px] text-slate-400 italic">
                                    Nessuno del gruppo presente
                                  </span>
                                ) : (
                                  lesson.attendees.map((uid) => {
                                    const u = users.find(
                                      (item) => item.id === uid
                                    );
                                    if (!u) return null;
                                    const uc =
                                      USER_COLORS[u.color] || USER_COLORS.blue;
                                    return (
                                      <span
                                        key={uid}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${uc.bgSoft} ${uc.text}`}
                                      >
                                        <span
                                          className={`w-2 h-2 rounded-full ${uc.bg}`}
                                        />
                                        {u.shortName}
                                      </span>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                )}
              </div>
            </>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: CALENDARIO LEZIONI & IMPORTAZIONE .ICS / ESSE3                 */}
          {/* ===================================================================== */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              {/* Box Importazione .ics / Cineca Esse3 */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-4 text-white shadow-md space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      Sync Universitario
                    </span>
                    <h2 className="text-base font-extrabold mt-1">
                      Importa Orario (.ics / Esse3)
                    </h2>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Sincronizza le lezioni dal portale universitario o carica
                      un file iCal.
                    </p>
                  </div>
                  <CalendarDays className="w-7 h-7 text-blue-200 shrink-0" />
                </div>

                {/* Input URL Sottoscrizione */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={icsUrlInput}
                    onChange={(e) => setIcsUrlInput(e.target.value)}
                    placeholder="URL feed .ics (Cineca / University Planner)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white/15 border border-white/25 text-white placeholder-blue-200 text-xs focus:outline-none"
                  />
                  <button
                    onClick={simulateEsse3Import}
                    className="px-3 py-2 rounded-xl bg-white text-blue-700 font-extrabold text-xs hover:bg-blue-50 shrink-0 shadow-sm"
                  >
                    Sincronizza
                  </button>
                </div>

                {/* Upload File .ics locale */}
                <div className="flex items-center justify-between pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".ics,text/calendar"
                    onChange={handleICSFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-3 rounded-xl bg-blue-800/60 hover:bg-blue-800 border border-blue-400/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Carica File .ics dal dispositivo
                  </button>
                </div>
              </div>

              {/* Form Aggiunta / Modifica Manuale Lezione */}
              <form
                onSubmit={handleSaveLesson}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3"
              >
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-blue-600" />
                  {editingLessonId
                    ? 'Modifica Lezione'
                    : 'Aggiungi Lezione Manualmente'}
                </h3>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Titolo corso (es. Architettura degli Elaboratori)"
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={lessonForm.dayIndex}
                      onChange={(e) =>
                        setLessonForm({
                          ...lessonForm,
                          dayIndex: Number(e.target.value),
                        })
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                    >
                      {WEEK_DAYS.map((d) => (
                        <option key={d.index} value={d.index}>
                          {d.full}
                        </option>
                      ))}
                    </select>

                    <input
                      type="time"
                      value={lessonForm.startTime}
                      onChange={(e) =>
                        setLessonForm({
                          ...lessonForm,
                          startTime: e.target.value,
                        })
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                    />

                    <input
                      type="time"
                      value={lessonForm.endTime}
                      onChange={(e) =>
                        setLessonForm({
                          ...lessonForm,
                          endTime: e.target.value,
                        })
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Sede / Aula (es. Aula B3 - Polo Dago)"
                      value={lessonForm.room}
                      onChange={(e) =>
                        setLessonForm({ ...lessonForm, room: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0"
                    >
                      {editingLessonId ? 'Salva' : 'Aggiungi'}
                    </button>
                    {editingLessonId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLessonId(null);
                          setLessonForm({
                            title: '',
                            dayIndex: 0,
                            startTime: '09:00',
                            endTime: '11:00',
                            room: '',
                          });
                        }}
                        className="px-2.5 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Elenco Completo Lezioni della Settimana */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">
                  Tutte le Lezioni del Gruppo ({groupLessons.length})
                </h3>
                {WEEK_DAYS.map((day) => {
                  const dayItems = groupLessons
                    .filter((l) => l.dayIndex === day.index)
                    .sort(
                      (a, b) =>
                        timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
                    );
                  if (dayItems.length === 0) return null;

                  return (
                    <div key={day.index} className="space-y-1.5">
                      <p className="text-xs font-extrabold text-slate-700 px-1 pt-1">
                        {day.full} ({day.dateLabel})
                      </p>
                      {dayItems.map((les) => (
                        <div
                          key={les.id}
                          className={`bg-white rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between gap-2 ${
                            les.cancelled ? 'opacity-60 bg-rose-50/30' : ''
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-blue-700">
                                {les.startTime}-{les.endTime}
                              </span>
                              <span
                                className={`text-xs font-bold text-slate-900 truncate ${
                                  les.cancelled ? 'line-through' : ''
                                }`}
                              >
                                {les.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {les.room}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingLessonId(les.id);
                                setLessonForm({
                                  title: les.title,
                                  dayIndex: les.dayIndex,
                                  startTime: les.startTime,
                                  endTime: les.endTime,
                                  room: les.room,
                                });
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700"
                              title="Modifica orario"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleCancelLesson(les)}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                les.cancelled
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              }`}
                              title={
                                les.cancelled
                                  ? 'Ripristina lezione'
                                  : 'Segnala lezione annullata'
                              }
                            >
                              {les.cancelled ? (
                                <RefreshCw className="w-3.5 h-3.5" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => deleteLesson(les)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600"
                              title="Elimina"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: CODA CIRCOLARE TURNI DI GUIDA & SCAMBI (SWAP)                  */}
          {/* ===================================================================== */}
          {activeTab === 'turns' && (
            <div className="space-y-4">
              {/* Richieste di Scambio Pendenti */}
              {activeGroup.swapRequests.filter((r) => r.status === 'pending')
                .length > 0 && (
                <div className="bg-amber-50 border border-amber-300 rounded-3xl p-4 space-y-2.5 shadow-sm">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <ArrowLeftRight className="w-4 h-4 text-amber-600" />
                    Richieste di Scambio in Attesa
                  </h3>
                  {activeGroup.swapRequests
                    .filter((r) => r.status === 'pending')
                    .map((req) => {
                      const fromU = users.find((u) => u.id === req.fromUserId);
                      const toU = users.find((u) => u.id === req.toUserId);
                      const isForMe = req.toUserId === currentUser.id;
                      return (
                        <div
                          key={req.id}
                          className="bg-white rounded-2xl p-3 border border-amber-200 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">
                              {fromU?.shortName} ⇄ {toU?.shortName}
                            </span>
                            <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              {WEEK_DAYS[req.fromDay].short} ⇄{' '}
                              {WEEK_DAYS[req.toDay].short}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 italic">
                            "{req.reason}"
                          </p>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => respondToSwapRequest(req.id, true)}
                              className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              {isForMe ? 'Accetta Scambio' : 'Approva (Simula)'}
                            </button>
                            <button
                              onClick={() =>
                                respondToSwapRequest(req.id, false)
                              }
                              className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                            >
                              Rifiuta
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Sequenza Fissa Circolare degli Automuniti */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">
                      Coda Circolare Fissa ("A Giro")
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Ordine base ciclico e conteggio tratte per scegliere chi
                      ha guidato meno.
                    </p>
                  </div>
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                </div>

                <div className="space-y-2">
                  {groupDrivers.map((drv, idx) => {
                    const dc = USER_COLORS[drv.color] || USER_COLORS.blue;
                    const stat = driverDriveCounts[drv.id] || {
                      outbound: 0,
                      inbound: 0,
                      total: 0,
                    };
                    const isLeast = recommendedLeastDriver?.id === drv.id;
                    return (
                      <div
                        key={drv.id}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <UserBadge user={drv} size="sm" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-extrabold text-slate-900">
                                {drv.name}
                              </p>
                              <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-[10px] font-extrabold text-slate-700">
                                {stat.total} tratte ({stat.outbound}A/
                                {stat.inbound}R)
                              </span>
                              {isLeast && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-extrabold">
                                  Meno turni
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500">
                              {drv.carModel} • {drv.seats} posti passeggeri
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveRotationMember(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveRotationMember(idx, 1)}
                            disabled={idx === groupDrivers.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Calendario Turni Settimanali Calcolati */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-2.5">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Programmazione Settimanale Calcolata
                </h3>
                {WEEK_DAYS.map((day) => {
                  const sched = getDriverScheduleForDay(day.index);
                  const drv = sched.outboundDriver;
                  const dc = drv ? USER_COLORS[drv.color] : USER_COLORS.blue;
                  const extraOut =
                    activeGroup.extraRides?.[day.index]?.outbound || [];
                  const extraIn =
                    activeGroup.extraRides?.[day.index]?.inbound || [];

                  return (
                    <div
                      key={day.index}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-11 text-center shrink-0">
                          <p className="text-xs font-extrabold text-slate-900">
                            {day.short}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {day.dateLabel}
                          </p>
                        </div>

                        {drv ? (
                          <div className="flex items-center gap-2 min-w-0">
                            <UserBadge user={drv} size="sm" />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-xs font-extrabold text-slate-900">
                                  {drv.shortName}
                                </span>
                                {sched.status === 'swapped' && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                    SWAP
                                  </span>
                                )}
                                {sched.status === 'manual' && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                    MANUALE
                                  </span>
                                )}
                                {(extraOut.length > 0 ||
                                  extraIn.length > 0) && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                                    +2ª AUTO
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 truncate">
                                {sched.note}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Nessun guidatore
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => openSwapModalForDay(day.index)}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-[11px] font-bold text-slate-700 flex items-center gap-1 shrink-0"
                      >
                        <ArrowLeftRight className="w-3 h-3 text-blue-600" />
                        Scambia
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 4: PROFILO UTENTE, COLORE UNIVOCO & STATO AUTOMUNITO              */}
          {/* ===================================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Card Profilo */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm text-center space-y-3">
                <div className="flex justify-center">
                  <div
                    className={`w-16 h-16 rounded-full ${currentUserColor.bg} text-white text-xl font-extrabold flex items-center justify-center shadow-lg ring-4 ring-slate-100`}
                  >
                    {currentUser.avatar}
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {currentUser.name}
                  </h2>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>

                {/* Selezione Colore Univoco */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Il tuo Colore Identificativo nel Gruppo
                  </p>
                  <div className="flex justify-center gap-2.5 flex-wrap">
                    {Object.values(USER_COLORS).map((c) => {
                      const active = currentUser.color === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => changeUserColor(c.id)}
                          className={`w-8 h-8 rounded-full ${
                            c.bg
                          } transition-transform flex items-center justify-center ${
                            active
                              ? 'scale-115 ring-2 ring-offset-2 ring-slate-900'
                              : 'opacity-75 hover:opacity-100'
                          }`}
                          title={c.name}
                        >
                          {active && (
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Stato Automunito / Solo Passeggero */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2.5 rounded-2xl ${
                        currentUser.hasCar
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {currentUser.hasCar ? 'Automunito' : 'Solo Passeggero'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {currentUser.hasCar
                          ? `${currentUser.carModel} (${currentUser.seats} posti)`
                          : 'Partecipi ai passaggi senza turni di guida'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={toggleCurrentUserCar}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                      currentUser.hasCar
                        ? 'bg-slate-900 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {currentUser.hasCar ? 'Passa a Passeggero' : 'Attiva Auto'}
                  </button>
                </div>

                {currentUser.hasCar && (
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Modello Auto
                      </label>
                      <input
                        type="text"
                        value={currentUser.carModel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.id === currentUser.id
                                ? { ...u, carModel: val }
                                : u
                            )
                          );
                        }}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Posti Passeggeri
                      </label>
                      <select
                        value={currentUser.seats}
                        onChange={(e) => {
                          const seats = Number(e.target.value);
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.id === currentUser.id ? { ...u, seats } : u
                            )
                          );
                        }}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} passeggeri + guidatore
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Card I Miei Gruppi */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    I Miei Gruppi
                  </h3>
                  <button
                    onClick={() => setShowNewGroupModal(true)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nuovo / Codice
                  </button>
                </div>

                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setActiveGroupId(g.id);
                      setActiveTab('dashboard');
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      g.id === activeGroup.id
                        ? 'border-blue-500 bg-blue-50/40'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">
                        {g.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {g.memberIds.length} partecipanti • Codice:{' '}
                        {g.inviteCode}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* BOTTOM TAB NAVIGATION BAR (Mobile-First PWA) */}
        <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around absolute bottom-0 inset-x-0 z-20">
          {[
            { id: 'dashboard', label: 'Oggi', icon: Navigation },
            { id: 'calendar', label: 'Calendario', icon: Calendar },
            { id: 'turns', label: 'Turni & Auto', icon: Car },
            { id: 'profile', label: 'Profilo', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                  active
                    ? 'text-blue-600 bg-blue-50/80 font-extrabold'
                    : 'text-slate-500 font-medium'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-0.5 ${active ? 'stroke-[2.5]' : ''}`}
                />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ===================================================================== */}
        {/* MODALE 1: OFFRI AUTO / AGGIUNGI 2ª MACCHINA (MULTI-VIAGGIO)           */}
        {/* ===================================================================== */}
        {showManualDriveModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <form
              onSubmit={handleConfirmOfferCar}
              className="bg-white w-full rounded-3xl p-5 space-y-3.5 shadow-2xl animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-blue-600" />
                  Metti a Disposizione Auto ({WEEK_DAYS[selectedDay].short})
                </h3>
                <button
                  type="button"
                  onClick={() => setShowManualDriveModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scelta modalità: Aggiungi 2ª Auto Extra vs Sostituisci Auto #1 */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setOfferRideAsExtra(true)}
                  className={`py-2 px-2 rounded-lg transition-all ${
                    offerRideAsExtra
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  + Aggiungi 2ª Auto / Viaggio
                </button>
                <button
                  type="button"
                  onClick={() => setOfferRideAsExtra(false)}
                  className={`py-2 px-2 rounded-lg transition-all ${
                    !offerRideAsExtra
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sostituisci Auto #1
                </button>
              </div>

              {/* Tratta: Andata + Ritorno, Solo Andata, Solo Ritorno */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Tratte coperte da {currentUser.shortName}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'both', label: 'Andata + Ritorno' },
                    { id: 'outbound', label: 'Solo Andata' },
                    { id: 'inbound', label: 'Solo Ritorno' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setOfferRideDirection(opt.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        offerRideDirection === opt.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orari specifici del viaggio */}
              <div className="grid grid-cols-2 gap-2.5">
                {(offerRideDirection === 'both' ||
                  offerRideDirection === 'outbound') && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Orario Partenza Andata
                    </label>
                    <input
                      type="time"
                      value={offerRideOutboundTime}
                      onChange={(e) => setOfferRideOutboundTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                    />
                  </div>
                )}
                {(offerRideDirection === 'both' ||
                  offerRideDirection === 'inbound') && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Orario Rientro Ritorno
                    </label>
                    <input
                      type="time"
                      value={offerRideInboundTime}
                      onChange={(e) => setOfferRideInboundTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                    />
                  </div>
                )}
              </div>

              {offerRideAsExtra && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Posti Pass.
                    </label>
                    <select
                      value={offerRideSeats}
                      onChange={(e) =>
                        setOfferRideSeats(Number(e.target.value))
                      }
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          +{n} posti
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Etichetta Viaggio (opzionale)
                    </label>
                    <input
                      type="text"
                      placeholder="es. Ritorno anticipato 13:15"
                      value={offerRideLabel}
                      onChange={(e) => setOfferRideLabel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                {offerRideAsExtra
                  ? 'Conferma e Aggiungi Macchina al Giorno'
                  : 'Conferma come Auto #1 Principale'}
              </button>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODALE 2: SCAMBIO TURNO (SWAP SENZA ROMPERE L'ORDINE CIRCOLARE)       */}
        {/* ===================================================================== */}
        {showSwapModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full rounded-3xl p-5 space-y-3.5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                  Scambio Turno Guida
                </h3>
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
                Stai scambiando il turno di{' '}
                <strong>{WEEK_DAYS[swapTargetDay]?.full}</strong>. La sequenza
                ciclica originale (
                {groupDrivers.map((d) => d.shortName).join(' → ')}) resterà
                intatta!
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Compagno automunito con cui scambiare
                </label>
                <select
                  value={swapPartnerId}
                  onChange={(e) => setSwapPartnerId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                >
                  {groupDrivers
                    .filter((d) => d.id !== currentUser.id)
                    .map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.carModel})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Giorno in cui tu recupererai il suo turno
                </label>
                <select
                  value={swapPartnerDay}
                  onChange={(e) => setSwapPartnerDay(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                >
                  {WEEK_DAYS.filter((d) => d.index !== swapTargetDay).map(
                    (d) => {
                      const sched = getDriverScheduleForDay(d.index);
                      return (
                        <option key={d.index} value={d.index}>
                          {d.full} ({d.dateLabel}) — Guidatore attuale:{' '}
                          {sched.outboundDriver?.shortName || 'N/D'}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Nota breve (opzionale)
                </label>
                <input
                  type="text"
                  placeholder="es. Ho un impegno la mattina, recuperiamo giovedì!"
                  value={swapReason}
                  onChange={(e) => setSwapReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => submitSwapRequest(false)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                >
                  Invia Richiesta
                </button>
                <button
                  onClick={() => submitSwapRequest(true)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  title="Simula accettazione immediata"
                >
                  Applica Subito (Test)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODALE 3: NUOVO GRUPPO O UNISCITI TRAMITE CODICE                      */}
        {/* ===================================================================== */}
        {showNewGroupModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">
                  Gestione Gruppi
                </h3>
                <button
                  onClick={() => setShowNewGroupModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Unisciti con Codice */}
              <form onSubmit={handleJoinGroupByCode} className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-700">
                  Unisciti a un gruppo esistente
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Codice invito (es. TIR-MED99)"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Entra
                  </button>
                </div>
              </form>

              <div className="border-t border-slate-100" />

              {/* Crea Nuovo Gruppo */}
              <form onSubmit={handleCreateGroup} className="space-y-2.5">
                <label className="block text-xs font-extrabold text-slate-700">
                  Oppure crea un nuovo gruppo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome gruppo (es. Pendolari Senigallia - Ancona)"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Tratta (es. Casello A14 ➔ Ingegneria)"
                  value={newGroupRoute}
                  onChange={(e) => setNewGroupRoute(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Crea Nuovo Gruppo
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODALE 4: AUTENTICAZIONE / REGISTRAZIONE NUOVO STUDENTE               */}
        {/* ===================================================================== */}
        {showAuthModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">
                  {authMode === 'login'
                    ? 'Accedi / Cambia Studente'
                    : 'Nuovo Profilo Studente'}
                </h3>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`py-1.5 rounded-lg ${
                    authMode === 'login'
                      ? 'bg-white shadow-xs text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  Switch Rapido
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`py-1.5 rounded-lg ${
                    authMode === 'register'
                      ? 'bg-white shadow-xs text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  Registrazione
                </button>
              </div>

              {authMode === 'login' ? (
                <div className="space-y-2">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUserId(u.id);
                        setShowAuthModal(false);
                        triggerToast(
                          `Accesso effettuato come ${u.name}`,
                          'success'
                        );
                      }}
                      className={`w-full p-2.5 rounded-2xl border flex items-center justify-between ${
                        u.id === currentUser.id
                          ? 'border-blue-500 bg-blue-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <UserBadge user={u} size="sm" />
                        <div className="text-left">
                          <p className="text-xs font-extrabold text-slate-900">
                            {u.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {u.email}
                          </p>
                        </div>
                      </div>
                      {u.id === currentUser.id && (
                        <UserCheck className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleRegisterUser} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Nome e Cognome (es. Elena Conti)"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Scegli Colore Univoco
                    </label>
                    <div className="flex gap-2">
                      {Object.values(USER_COLORS).map((c) => (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setRegColor(c.id)}
                          className={`w-7 h-7 rounded-full ${c.bg} ${
                            regColor === c.id
                              ? 'ring-2 ring-offset-2 ring-slate-900'
                              : 'opacity-70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={regHasCar}
                      onChange={(e) => setRegHasCar(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    Sono automunito/a (partecipo ai turni di guida)
                  </label>
                  {regHasCar && (
                    <input
                      type="text"
                      placeholder="Modello auto (es. Renault Clio Bianca)"
                      value={regCarModel}
                      onChange={(e) => setRegCarModel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    />
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Crea Account ed Entra nel Gruppo
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* DRAWER CENTRO NOTIFICHE IN-APP                                        */}
        {/* ===================================================================== */}
        {showNotifDrawer && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
            <div className="bg-white w-[88%] h-full p-4 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Notifiche Gruppo
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((n) => ({ ...n, read: true }))
                      )
                    }
                    className="text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    Segna lette
                  </button>
                  <button
                    onClick={() => setShowNotifDrawer(false)}
                    className="p-1 rounded-full bg-slate-100 text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {notifications.filter((n) => n.groupId === activeGroup.id)
                  .length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    Nessuna notifica
                  </p>
                ) : (
                  notifications
                    .filter((n) => n.groupId === activeGroup.id)
                    .map((n) => {
                      const linkedReq = n.swapRequestId
                        ? activeGroup.swapRequests.find(
                            (r) => r.id === n.swapRequestId
                          )
                        : null;

                      return (
                        <div
                          key={n.id}
                          className={`p-3 rounded-2xl border space-y-2 ${
                            n.read
                              ? 'bg-slate-50 border-slate-200/70'
                              : 'bg-blue-50/60 border-blue-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-slate-900">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">
                            {n.message}
                          </p>

                          {/* Azioni dirette su richiesta di scambio */}
                          {linkedReq && linkedReq.status === 'pending' && (
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() =>
                                  respondToSwapRequest(linkedReq.id, true)
                                }
                                className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold"
                              >
                                Accetta
                              </button>
                              <button
                                onClick={() =>
                                  respondToSwapRequest(linkedReq.id, false)
                                }
                                className="flex-1 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-[11px] font-bold"
                              >
                                Rifiuta
                              </button>
                            </div>
                          )}
                          {linkedReq && linkedReq.status !== 'pending' && (
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                                linkedReq.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {linkedReq.status === 'accepted'
                                ? 'Scambio Accettato'
                                : 'Rifiutato'}
                            </span>
                          )}
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
