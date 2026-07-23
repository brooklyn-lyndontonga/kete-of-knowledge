import React from "react"

export default function HelpDrawer({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-base-100 h-screen shadow-2xl flex flex-col z-10 animate-slide-in overflow-hidden border-l border-base-200">
        {/* Header */}
        <div className="p-6 border-b border-base-200 flex items-center justify-between bg-base-200/50">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-xl font-bold">Help & Support Hub</h2>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="Close Help Drawer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section: Roles & Safety */}
          <div className="card bg-base-200/50 border border-base-200 p-4 rounded-xl">
            <h3 className="font-bold text-sm text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Access Control & Safety
            </h3>
            <ul className="space-y-2 text-sm text-base-content/80 list-disc list-inside">
              <li>
                <span className="font-semibold text-base-content">Admins:</span> Full capabilities including creating, editing, and deleting items.
              </li>
              <li>
                <span className="font-semibold text-base-content">Editors:</span> Can view, create, and edit, but cannot delete content.
              </li>
              <li>
                <span className="font-semibold text-base-content">Soft Deletes:</span> Deleting an item archives it instead of destroying it. Change views to <strong>Archived Content</strong> to restore them.
              </li>
            </ul>
          </div>

          {/* Section: Quick FAQ */}
          <div>
            <h3 className="font-bold text-lg mb-3">Frequently Asked Questions</h3>
            <div className="join join-vertical w-full border border-base-200 bg-base-100 rounded-xl overflow-hidden">
              <div className="collapse collapse-arrow join-item border-b border-base-200">
                <input type="radio" name="help-faq-accordion" defaultChecked /> 
                <div className="collapse-title font-semibold text-sm">
                  How do I publish content to the app?
                </div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>Use the &quot;Status&quot; toggle in the table. Toggle it green to publish immediately, or off to keep it as a draft.</p>
                </div>
              </div>
              
              <div className="collapse collapse-arrow join-item border-b border-base-200">
                <input type="radio" name="help-faq-accordion" /> 
                <div className="collapse-title font-semibold text-sm">
                  How does sorting/ordering work?
                </div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>In sections like Whakataukī, edit an entry and set the &quot;Sort Order&quot; number. Lower numbers display first in the app.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item border-b border-base-200">
                <input type="radio" name="help-faq-accordion" /> 
                <div className="collapse-title font-semibold text-sm">
                  What happens when an item is deleted?
                </div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>It is soft-deleted. The item is hidden from the public API but remains in the database. Only users with the <strong>Admin</strong> role can view the &quot;Archived&quot; list and restore items.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="help-faq-accordion" /> 
                <div className="collapse-title font-semibold text-sm">
                  Why was I logged out automatically?
                </div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>For security, the panel will automatically log you out after 30 minutes of inactivity to protect your account.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Video Loom Guidance */}
          <div>
            <h3 className="font-bold text-lg mb-3">Video Tutorials</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral flex items-center justify-center border border-base-300 shadow group cursor-pointer">
              {/* Play symbol overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-content shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
                Admin Panel Walkthrough (3:45)
              </div>
            </div>
          </div>

          {/* Section: Notion & Resources Hub */}
          <div className="pt-2">
            <h3 className="font-bold text-lg mb-3">Notion & Documentation</h3>
            <a 
              href="https://notion.so/kete-of-knowledge" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-4 bg-base-100 hover:bg-base-200 border border-base-200 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center text-lg font-bold">
                  N
                </div>
                <div>
                  <div className="font-semibold text-sm">Official Notion Hub</div>
                  <div className="text-xs text-base-content/50">Policies, content guides, and developer notes</div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Slide-in styles if not in global css */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
