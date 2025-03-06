const DashboardCard = ({ icon, primaryText, secundaryText }) => {
  return (
    <div className="rounded=[10px] flex h-[150px] flex-col items-center justify-center gap-1 bg-white">
      <div className="flex items-center gap-2">
        <span className="text-brend-primary">{icon}</span>
        <p className="text-2xl font-bold text-brend-darkGrey">{primaryText}</p>
      </div>
      {secundaryText}
    </div>
  )
}

export default DashboardCard
