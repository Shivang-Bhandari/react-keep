export const autoResize = field => {
    // Reset field height
    field.style.height = 'inherit';

    // Get the computed styles for the element
    const computedStyle = window.getComputedStyle(field);

    // Calculate the height
    const height = parseInt(computedStyle.getPropertyValue('border-top-width'), 10)
        + parseInt(computedStyle.getPropertyValue('padding-top'), 10)
        + field.scrollHeight
        + parseInt(computedStyle.getPropertyValue('padding-bottom'), 10)
        + parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
    
    field.style.height = `${height}px`;
};