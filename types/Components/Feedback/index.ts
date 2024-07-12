/** Possible feedback message types */
export type FeedbackMessageType =
  | 'default'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'loading';

/** Base type for Feedback components */
export type FeedbackBaseType = {
  /** The feedback title */
  title?: string;
  /** The feedback message */
  message: string;
  /** The type of feedback */
  type?: FeedbackMessageType;
};

/** Feedback components with user input */
export type FeedbackInputType = FeedbackBaseType & {
  /** Called based on response. True for positive, false for negative, and undefined for neutral
   * @param isPositive If the response was positive
   */
  onClose?: (isPositive?: boolean) => any;
};

/** Used to manage current state of feedback */
export type FeedbackStateType = FeedbackInputType & {
  /** If the feedback is currently being shown */
  visible?: boolean;
};
