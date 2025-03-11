import PropTypes from "prop-types"

const DashboardCard = ({ icon, primaryText, secundaryText }) => {
  return (
    <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-[10px] bg-white">
      <div className="flex items-center gap-2">
        <span className="text-brend-primary">{icon}</span>
        <p className="text-2xl font-bold text-brend-darkGrey">{primaryText}</p>
      </div>
      {secundaryText}
    </div>
  )
}

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  primaryText: PropTypes.number,
  secundaryText: PropTypes.string,
}

export default DashboardCard
