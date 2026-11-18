"use client";

import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";
import { MoreHorizontal, Paperclip, Send, Smile } from "lucide-react";
import { Avatar } from "./Avatar";
import {
  ROLE_LABEL,
  STATUS_LABEL,
  THREAD_DATE_LABEL,
  firstName,
  formatDecimal,
  type Conversation,
  type Message,
  type OrderSummary,
} from "./feedback";

interface Props {
  conversation: Conversation | undefined;
  messages: Message[];
  order: OrderSummary | undefined;
  draft: string;
  onDraftChange: (text: string) => void;
  onSend: () => void;
  onViewOrder: (orderId: string) => void;
}

export function ChatThread({
  conversation,
  messages,
  order,
  draft,
  onDraftChange,
  onSend,
  onViewOrder,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conversation?.id, messages.length]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-secondary/10 bg-white p-10 text-sm text-secondary/60">
        Select a conversation to start messaging.
      </div>
    );
  }

  const roleLabel = ROLE_LABEL[conversation.role];
  const subtitle = conversation.orderRef ? `${roleLabel} · Order ${conversation.orderRef}` : roleLabel;
  const canSend = draft.trim() !== "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex max-h-[44rem] flex-col rounded-xl border border-secondary/10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-secondary/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <Avatar name={conversation.name} size="md" />
          <div>
            <p className="text-sm font-semibold">{conversation.name}</p>
            <p className="text-xs text-secondary/60">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {conversation.isVip && (
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-600">
              ● VIP
            </span>
          )}
          <button type="button" aria-label="More options" className="text-secondary/50">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Mga mensahe */}
      <div ref={scrollRef} className="min-h-[20rem] flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <p className="text-center text-[11px] font-medium uppercase tracking-wider text-secondary/40">
          {THREAD_DATE_LABEL}
        </p>

        {messages.map((m) => {
          const mine = m.from === "admin";
          const meta = mine && m.status ? `${m.time} · ${STATUS_LABEL[m.status]}` : m.time;
          return (
            <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <p className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${mine ? "bg-tertiary/10" : "bg-primary"}`}>
                {m.text}
              </p>
              <span className="mt-1 text-xs text-secondary/50">{meta}</span>
            </div>
          );
        })}

        {order && (
          <div className="flex items-center justify-between rounded-lg border border-secondary/10 bg-primary px-4 py-3">
            <div>
              <p className="text-sm font-semibold">
                {order.id} · {order.summary}
              </p>
              <p className="text-xs text-secondary/60">
                {formatDecimal(order.amount)} · {order.payment}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewOrder(order.id)}
              className="text-sm font-medium text-tertiary"
            >
              View →
            </button>
          </div>
        )}
      </div>

      {/* Reply box */}
      <form onSubmit={handleSubmit} className="border-t border-secondary/10 p-5">
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder={`Reply to ${firstName(conversation.name)}…`}
          className="w-full resize-none rounded-lg border border-secondary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-tertiary"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-secondary/50">
            <button type="button" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <button type="button" aria-label="Add emoji">
              <Smile size={18} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!canSend}
            className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            <Send size={16} /> Send reply
          </button>
        </div>
      </form>
    </div>
  );
}