// Type of cell state for logic puzzle
export const Cell_state = Object.freeze
({ 
	NONE: 0,			// Empty cell
	XMARK: 1,			// Crossed cell by user
	XMARK_DISABLE: 2,	// Crossed cell by script
	CHECK: 3			// Checked cell
});