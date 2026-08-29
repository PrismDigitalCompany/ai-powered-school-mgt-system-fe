
const EmptyState = ({icon: Icon, message, title, action})=>{
return (<div className="flex flex-col items-center justify-center text-center py-14 px-6 border border-dashed border-border-line rounded-md bg-card">
{Icon &&(
  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-background text-error-txt mb-4">
    <Icon size={24} />
  </span>
)}
<p className="font-display text-lg text-text-body">{message}</p>
</div>)
}
export default EmptyState