"use client";

import { useState } from "react";
import { PenSquare } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import {
  CONVERSATIONS,
  DEFAULT_AUDIENCE,
  DEFAULT_CONVERSATION_ID,
  ORDER_SUMMARIES,
  RATING_SUMMARY,
  REVIEWS,
  THREADS,
  type ConversationRole,
  type Message,
} from "./feedback";
import { ConversationList } from "./ConversationList";
import { RiderConversation } from "./RiderConversation";
import { ChatThread } from "./ChatThread";
import { CustomerRatings } from "./CustomerRatings";
import { Announcements } from "./Announcements";

export function FeedbackPage() {
  const [tab, setTab] = useState<ConversationRole>("customer");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_CONVERSATION_ID);
  const [threads, setThreads] = useState<Record<string, Message[]>>(THREADS);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [audience, setAudience] = useState(DEFAULT_AUDIENCE);
  const [announcement, setAnnouncement] = useState("");

  const selected = CONVERSATIONS.find((c) => c.id === selectedId);
  const messages = selected ? threads[selected.id] ?? [] : [];
  const draft = selected ? replyDrafts[selected.id] ?? "" : "";
  const order = selected?.orderRef ? ORDER_SUMMARIES[selected.orderRef] : undefined;
  const latestRider = CONVERSATIONS.find((c) => c.role === "rider");

  const handleTabChange = (role: ConversationRole) => {
    setTab(role);
    setSelectedId(CONVERSATIONS.find((c) => c.role === role)?.id ?? null);
  };

  const handleReplyToRider = (conversationId: string) => {
    setTab("rider");
    setQuery("");
    setSelectedId(conversationId);
  };

  const handleDraftChange = (text: string) => {
    if (!selected) return;
    setReplyDrafts((d) => ({ ...d, [selected.id]: text }));
  };

  const handleSend = () => {
    if (!selected) return;
    const text = draft.trim();
    if (text === "") return;

    // TODO(backend): ipadala muna ang mensahe (hal. POST /conversations/:id/messages)
    const message: Message = {
      id: `local-${Date.now()}`,
      from: "admin",
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      status: "sent",
    };
    setThreads((t) => ({ ...t, [selected.id]: [...(t[selected.id] ?? []), message] }));
    setReplyDrafts((d) => ({ ...d, [selected.id]: "" }));
  };

  const handleSendAnnouncement = () => {
    const text = announcement.trim();
    if (text === "") return;

    // TODO(backend): POST /announcements { audience, message }
    setAnnouncement("");
  };

  const handleNewConversation = () => {
    // TODO: buksan ang New conversation modal
  };

  const handleViewOrder = (orderId: string) => {
    // TODO: pumunta sa order details para sa orderId
    void orderId;
  };

  const handleReplyToReview = (reviewId: string) => {
    // TODO: buksan ang reply box para sa reviewId
    void reviewId;
  };

  return (
    <AdminShell active="Feedback & Messages">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feedback &amp; Messages</h1>
          <p className="text-sm text-secondary/60">
            Listen to your customers. Keep every conversation moving.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNewConversation}
          className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white"
        >
          <PenSquare size={16} /> New conversation
        </button>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,1.1fr)] gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <ConversationList
            conversations={CONVERSATIONS}
            tab={tab}
            onTabChange={handleTabChange}
            query={query}
            onQueryChange={setQuery}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <RiderConversation conversation={latestRider} onReply={handleReplyToRider} />
        </div>

        {/* Gitna */}
        <ChatThread
          conversation={selected}
          messages={messages}
          order={order}
          draft={draft}
          onDraftChange={handleDraftChange}
          onSend={handleSend}
          onViewOrder={handleViewOrder}
        />

        {/* Kanan */}
        <div className="space-y-4">
          <CustomerRatings summary={RATING_SUMMARY} reviews={REVIEWS} onReply={handleReplyToReview} />
          <Announcements
            audience={audience}
            message={announcement}
            onAudienceChange={setAudience}
            onMessageChange={setAnnouncement}
            onSend={handleSendAnnouncement}
          />
        </div>
      </div>
    </AdminShell>
  );
}