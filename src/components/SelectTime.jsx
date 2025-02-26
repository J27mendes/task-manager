import InputLabel from './InputLabel'
const SelectTime = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00AD85] placeholder:text-sm placeholder:text-[#9A9CF]"
        {...props}
      >
        <option value={'morning'}>Manhã</option>
        <option value={'afternoon'}>Tarde</option>
        <option value={'evening'}>Noite</option>
      </select>
    </div>
  )
}

export default SelectTime
