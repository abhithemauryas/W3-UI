import Select from 'react-select';

const ReactSelectComponent = ({
  placeholder = 'Select an option',
  defaultValue = null,
  onChange,
  options = [],
  isSearchable = true,
  className = 'custom-select-container',
  classNamePrefix = 'custom-select',
  isMulti = false,
  isClearable = false,
  isDisabled = false,
  value = null,
  isLoading = false,
  onInputChange = () => {},
  onMenuScrollToBottom = undefined,
}) => {
  return (
    <Select
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isSearchable={isSearchable}
      className={className}
      classNamePrefix={classNamePrefix}
      isMulti={isMulti}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onInputChange={onInputChange}
      onMenuScrollToBottom={onMenuScrollToBottom}
    />
  );
};

export default ReactSelectComponent;
