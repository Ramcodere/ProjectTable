# Skincare Catalog Management - Frontend Task

This project provides an intuitive UI for managing a skincare product catalog, allowing users to add, delete, and edit product information. Users can also manage table columns, filter data, and perform various actions with a clean interface.

## Features

### 1. Add a Row to the Table
- **Navigate to the "+ Add Row" button**: Located at the top-right corner of the table.
- **Click the "+ Add Row" button**: Adds an empty row to input new product details such as `PRODUCT_LINK`, `NAME`, `INGREDIENTS`, and `PRICE`.

### 2. Delete a Row from the Table
- **Locate the delete icon**: Each row has a delete icon (trash bin) on the right side.
- **Click the delete icon**: Opens a confirmation modal with the message: _"Are you sure you want to delete this row? This action cannot be undone."_
- **Confirm Deletion**: Click _"Yes, Confirm"_ to permanently delete the row.

### 3. Add a New Column to the Table
- **Navigate to the "+ Add New Column" button**: Located next to the last column header.
- **Click the "+ Add New Column" button**: Opens a "Create Field" modal dialog.
- **Fill in Column Details**:
  - Field Name: A unique name for the new column.
  - Field Type: Select the data type (e.g., text, number, date).
  - _Other fields can be ignored._
- **Click "Create"**: Adds the new column to the table.

### 4. Edit Cell Values in the Table
- **Click on a cell**: Enter edit mode for that specific cell.
- **Enter the new value**: Input the new data for the cell.
- **Save the changes**: Press `Enter` or click outside the cell to save.

### 5. Filter Data in the Table
- **Locate the filter icon**: Each column header has a small filter icon.
- **Click the filter icon**: Opens a filter menu specific to the column's data type:
  - Text Filters: Filter by text content (e.g., "Contains", "Does Not Contain").
  - Number Filters: Filter by numeric conditions (e.g., "Greater Than", "Less Than").
- **Apply filters**: Input the filter criteria and click _"Apply"_.
- **Reset filters**: Use the "Reset All" button to clear all filters.

## Key Requirements

### 1. Console Logging for Add/Delete Actions
- Ensure that a `console.log` is triggered whenever a row or column is added or deleted. The log should provide details about the action performed for easier debugging and tracking.

### 2. Column Filter Behavior
- When a filter is opened for a column, it should automatically close if the user clicks outside the filter area.

### 3. Separate Filters for Number and Text Columns
- Text columns should have filters like _"Contains"_, while number columns should provide options like _"Greater Than"_ or _"Less Than"_. Use distinct filter types to ensure proper functionality.


### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/my-app.git
