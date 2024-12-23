INSERT INTO msgstore (sender, receiver, msg, msgread,reached_server, msgtime, msgtype, msglink, msgcaption)
VALUES
-- Chats with Jane Smith
('1234567890', '2345678901', 'Good morning, Jane! How’s your day going?', false, false, '2024-08-30 08:30:00', 'text', '', ''),
('2345678901', '1234567890', 'Morning, John! It’s going well, thanks. How about you?', false, false, '2024-08-30 08:35:00', 'text', '', ''),
('1234567890', '2345678901', 'Doing great! Let’s catch up later today.', false, false, '2024-08-30 08:40:00', 'text', '', ''),
('2345678901', '1234567890', 'Sure, I’m free after 3 PM.', false, false, '2024-08-30 08:45:00', 'text', '', ''),
('1234567890', '2345678901', 'Perfect! I’ll see you then.', false, false, '2024-08-30 08:50:00', 'text', '', ''),
('1234567890', '2345678901', 'Hey Jane, I just sent you the meeting notes.', false, false, '2024-09-02 09:00:00', 'text', '', ''),
('2345678901', '1234567890', 'Got them, thanks!', false, false, '2024-09-02 09:05:00', 'text', '', ''),
('1234567890', '2345678901', 'No problem. Let me know if you need anything else.', false, false, '2024-09-02 09:10:00', 'text', '', ''),
('1234567890', '2345678901', 'Do you have time to review the document today?', false, false, '2024-09-04 10:00:00', 'text', '', ''),
('2345678901', '1234567890', 'Yes, I’ll get to it after lunch.', false, false, '2024-09-04 10:05:00', 'text', '', ''),
-- Chats with David Johnson
('1234567890', '3456789012', 'Hey David, how’s the project going?', false, false, '2024-08-31 11:00:00', 'text', '', ''),
('3456789012', '1234567890', 'Hi John, it’s going well. We’re almost done.', false, false, '2024-08-31 11:05:00', 'text', '', ''),
('1234567890', '3456789012', 'Great to hear! Let me know if you need any help.', false, false, '2024-08-31 11:10:00', 'text', '', ''),
('3456789012', '1234567890', 'Will do, thanks!', false, false, '2024-08-31 11:15:00', 'text', '', ''),
('1234567890', '3456789012', 'Sent over the latest draft. Can you review it?', false, false, '2024-09-03 14:00:00', 'text', '', ''),
('3456789012', '1234567890', 'Sure, I’ll take a look this afternoon.', false, false, '2024-09-03 14:05:00', 'text', '', ''),
('1234567890', '3456789012', 'Thanks, appreciate it.', false, false, '2024-09-03 14:10:00', 'text', '', ''),
('1234567890', '3456789012', 'Any updates on the client feedback?', false, false, '2024-09-05 15:00:00', 'text', '', ''),
('3456789012', '1234567890', 'Not yet, I’ll follow up with them today.', false, false, '2024-09-05 15:05:00', 'text', '', ''),
('1234567890', '3456789012', 'Cool, let me know what they say.', false, false, '2024-09-05 15:10:00', 'text', '', ''),
-- Chats with Emily Davis
('1234567890', '4567890123', 'Hey Emily, did you get the new software installed?', false, false, '2024-09-01 10:00:00', 'text', '', ''),
('4567890123', '1234567890', 'Yes, it’s up and running.', false, false, '2024-09-01 10:05:00', 'text', '', ''),
('1234567890', '4567890123', 'Awesome! Let me know if you run into any issues.', false, false, '2024-09-01 10:10:00', 'text', '', ''),
('4567890123', '1234567890', 'Will do, thanks!', false, false, '2024-09-01 10:15:00', 'text', '', ''),
('1234567890', '4567890123', 'I’m planning to upgrade the system next week. Does that work for you?', false, false, '2024-09-03 16:00:00', 'text', '', ''),
('4567890123', '1234567890', 'Yes, next week is fine.', false, false, '2024-09-03 16:05:00', 'text', '', ''),
('1234567890', '4567890123', 'Great, I’ll schedule it.', false, false, '2024-09-03 16:10:00', 'text', '', ''),
('1234567890', '4567890123', 'Did you get a chance to check the report?', false, false, '2024-09-06 11:00:00', 'text', '', ''),
('4567890123', '1234567890', 'Yes, I reviewed it. Looks good.', false, false, '2024-09-06 11:05:00', 'text', '', ''),
('1234567890', '4567890123', 'Perfect, thanks!', false, false, '2024-09-06 11:10:00', 'text', '', ''),
-- Chats with Michael Brown
('1234567890', '5678901234', 'Hey Michael, have you checked out the new feature?', false, false, '2024-09-02 09:00:00', 'text', '', ''),
('5678901234', '1234567890', 'Yes, it looks great! Nice work.', false, false, '2024-09-02 09:05:00', 'text', '', ''),
('1234567890', '5678901234', 'Thanks! Let’s discuss the rollout plan.', false, false, '2024-09-02 09:10:00', 'text', '', ''),
('5678901234', '1234567890', 'Sure, I’m free this afternoon.', false, false, '2024-09-02 09:15:00', 'text', '', ''),
('1234567890', '5678901234', 'Perfect, I’ll send you a calendar invite.', false, false, '2024-09-02 09:20:00', 'text', '', ''),
('1234567890', '5678901234', 'Michael, can you review the marketing materials?', false, false, '2024-09-04 14:00:00', 'text', '', ''),
('5678901234', '1234567890', 'On it, John. Should have it done by end of day.', false, false, '2024-09-04 14:05:00', 'text', '', ''),
('1234567890', '5678901234', 'Great, thanks for the quick turnaround.', false, false, '2024-09-04 14:10:00', 'text', '', ''),
('1234567890', '5678901234', 'Hey, did you get the latest sales numbers?', false, false, '2024-09-07 13:00:00', 'text', '', ''),
('5678901234', '1234567890', 'Yes, just got them. I’ll send you a summary.', false, false, '2024-09-07 13:05:00', 'text', '', ''),
-- Chats with Olivia Wilson
('1234567890', '6789012345', 'Olivia, did you finish the client presentation?', false, false, '2024-09-03 10:00:00', 'text', '', ''),
('6789012345', '1234567890', 'Yes, I wrapped it up this morning.', false, false, '2024-09-03 10:05:00', 'text', '', '')





INSERT INTO msgstore (sender,receiver,msg,msgtype,msgtime) VALUES ('1234567890','2345678901','hello there','text','2024-09-09T16:18:52.466Z' )

INSERT INTO msgstore (sender,receiver,msg,msgtype,msgtime) VALUES ('1234567890','3456789012','hello there david','text','2024-09-09T16:22:13.203Z' )