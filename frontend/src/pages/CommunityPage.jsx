import React, { useState } from 'react'

const INITIAL_THREADS = [
  {
    id: 1,
    title: 'Organic pest control for brinjal borer',
    author: 'Farmer • 12 km away',
    replies: 24,
    tag: 'Organic',
  },
  {
    id: 2,
    title: 'Experience with solar pump subsidy in Bihar',
    author: 'Farmer • 35 km away',
    replies: 15,
    tag: 'Government scheme',
  },
  {
    id: 3,
    title: 'Which wheat variety works best in alluvial soil?',
    author: 'Farmer • 20 km away',
    replies: 32,
    tag: 'Variety selection',
  },
]

export default function CommunityPage() {
  const [threads, setThreads] = useState(INITIAL_THREADS)
  const [newQuestion, setNewQuestion] = useState('')

  const handlePost = () => {
    const text = newQuestion.trim()
    if (!text) return
    const newThread = {
      id: threads.length + 1,
      title: text,
      author: 'You',
      replies: 0,
      tag: 'New question',
    }
    setThreads([newThread, ...threads])
    setNewQuestion('')
    alert('Your question has been posted.')
  }

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Community</p>
          <h3 className="text-base font-semibold">Farmer Forum</h3>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs">
          + New discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
        <div className="lg:col-span-2 space-y-2">
          {threads.map(t => (
            <div
              key={t.id}
              className="rounded-xl border border-slate-200 bg-white p-3 hover:border-emerald-400 cursor-pointer"
            >
              <p className="text-[13px] font-medium mb-1">{t.title}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{t.author}</span>
                <span>{t.replies} replies</span>
              </div>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {t.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 text-xs">
          <p className="text-sm font-semibold">Ask a question</p>
          <textarea
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            className="w-full h-24 rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none"
            placeholder="Write your farming question here in simple words..."
          />
          <button
            onClick={handlePost}
            className="w-full text-xs px-3 py-2 rounded-lg bg-emerald-500 text-white"
          >
            Post question
          </button>
          <p className="text-[11px] text-slate-500">
            Tip: Add your crop, field size and location for better help from other farmers.
          </p>
        </div>
      </div>
    </section>
  )
}
