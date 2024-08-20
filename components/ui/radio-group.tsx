import React from 'react'

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onValueChange?: (value: string) => void; // Add this
    defaultValue?: string; // Add this
    className?: string; // Add this if not already included
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, onValueChange, defaultValue, className, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-4" ref={ref} {...props}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                onChange: onValueChange,
                checked: child.props.value === defaultValue,
              })
            : child
        )}
      </div>
    );
  }
);

interface RadioGroupItemProps {
    value: string;
    id: string;
    children?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ children, ...props }, ref) => {
    return (
        <label className="inline-flex items-center mr-4">
            <input type="radio" className="form-radio" ref={ref} {...props} />
            {children && <span className="ml-2">{children}</span>}
        </label>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export {
    RadioGroup,
    RadioGroupItem
}