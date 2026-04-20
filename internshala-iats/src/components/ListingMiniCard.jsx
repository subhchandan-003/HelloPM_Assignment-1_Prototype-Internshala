import ResponseRateBadge from './ResponseRateBadge';

export default function ListingMiniCard({ listing, onApply }) {
  return (
    <div className="w-full bg-white border border-border-default rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
          style={{ backgroundColor: listing.companyColor }}
        >
          {listing.companyInitials}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-text-primary truncate">{listing.role}</p>
          <p className="text-[11px] text-text-secondary truncate">{listing.company}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] text-text-secondary">{listing.stipend}/mo</span>
        <span className="text-[11px] text-text-muted">•</span>
        <ResponseRateBadge rate={listing.responseRate} />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onApply(listing);
        }}
        className="w-full py-1.5 bg-primary text-white text-[12px] font-semibold rounded-md hover:bg-primary-hover transition-colors cursor-pointer"
      >
        Quick Apply
      </button>
    </div>
  );
}
