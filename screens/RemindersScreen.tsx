import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddReminder from '../components/reminder/AddReminder';
import Reminder from '../beans/Reminder';
import Header from '../components/Header';
import styles from './ScreenStyles';
import ReminderListItem from '../components/reminder/ReminderListItem';
import moment from 'moment';
import CompletedReminderListItem from '../components/reminder/CompletedReminderListItem';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import SpecialModal from '../components/modals/SpecialModal';
import {REMINDERS_QUERY} from '../hooks/query-cache-names';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {remindersService} from '../config/appConfig';

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder>({} as Reminder);
  const [completedReminders, setCompletedReminders] = useState<Reminder[]>([]);
  const [renderedReminders, setRenderedReminders] = useState<JSX.Element[]>([]);
  const [renderedCompletedReminders, setRenderedCompletedReminders] = useState<JSX.Element[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isDarkMode = useColorScheme() === 'dark';
  const {data: allReminders, isLoading, isSuccess} = useQuery(
    [REMINDERS_QUERY],
    () => remindersService.getReminders(),
    {cacheTime: 10000, refetchInterval: 10000},
  );
  const queryClient = useQueryClient();

  async function addReminder(text: string, dateTime: Date) {
    queryClient.cancelQueries([REMINDERS_QUERY]);
    // const oldReminders: Reminder[] = [...reminders, ...completedReminders];

    try {
      const newReminder: Reminder = new Reminder(text, dateTime);
      // @ts-ignore
      queryClient.setQueryData([REMINDERS_QUERY], (old: Reminder[]) => [newReminder, ...old]);

      // await remindersService.addReminder(newReminder);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([REMINDERS_QUERY], oldReminders);
    } finally {
      // queryClient.invalidateQueries([REMINDERS_QUERY]);
    }
  }

  async function completeReminder(reminderToComplete: Reminder) {
    queryClient.cancelQueries([REMINDERS_QUERY]);
    // const oldReminders: Reminder[] = [...reminders, ...completedReminders];
    let remindersCopy: Reminder[] = [...reminders];
    let completedRemindersCopy: Reminder[] = [...completedReminders];

    try {
      if (reminderToComplete.text.trim() === 'Have the perfect day') {
        setModalVisible(true);
      }
      const index: number = reminders.findIndex(r => r.id === reminderToComplete.id);
      reminderToComplete.complete = !reminderToComplete.complete;
      remindersCopy.splice(index, 1);
      completedRemindersCopy.unshift(reminderToComplete);
      queryClient.setQueryData([REMINDERS_QUERY], [...remindersCopy, ...completedRemindersCopy]);

      // await remindersService.updateReminder(reminderToComplete);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // setReminders(oldReminders);
      // queryClient.setQueryData([REMINDERS_QUERY], oldReminders);
    } finally {
      // queryClient.invalidateQueries([REMINDERS_QUERY]);
    }
  }

  async function editReminder(id: number, text: string, dateTime: Date) {
    queryClient.cancelQueries([REMINDERS_QUERY]);
    // const oldReminders: Reminder[] = [...reminders, ...completedReminders];
    let remindersCopy: Reminder[] = [...reminders];

    try {
      let reminderToUpdate: Reminder = reminders.find(r => r.id === id)!!;
      const index: number = reminders.findIndex(r => r.id === reminderToUpdate.id);

      reminderToUpdate.text = text;
      reminderToUpdate.dateTime = dateTime;
      reminderToUpdate.dateTimeString = generateDateTimeString(dateTime);
      remindersCopy.splice(index, 1, reminderToUpdate);
      queryClient.setQueryData([REMINDERS_QUERY], [...remindersCopy, ...completedReminders]);

      // await remindersService.updateReminder(reminderToUpdate);
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([REMINDERS_QUERY], oldReminders);
    } finally {
      // queryClient.invalidateQueries([REMINDERS_QUERY]);
    }
  }

  async function deleteReminders() {
    queryClient.cancelQueries([REMINDERS_QUERY]);
    // const oldReminders: Reminder[] = [...reminders, ...completedReminders];

    try {
      queryClient.setQueryData([REMINDERS_QUERY], reminders);
      // await remindersService.deleteCompletedReminders();
    } catch (error) {
      // Swallow exception, comment the catch and finally blocks back in to use with a backend.
      // queryClient.setQueryData([REMINDERS_QUERY], oldReminders);
    } finally {
      // queryClient.invalidateQueries([REMINDERS_QUERY]);
    }
  }

  function onEditPressed(reminder: Reminder) {
    setReminderToEdit(reminder);
  }

  function generateDateTimeString(dateTime: Date): string {
    const dayMonthString = dateTime
      .toString()
      .substring(0, dateTime.toString().indexOf(dateTime.getFullYear().toString()) - 1);
    const time = moment(dateTime).format('LT');
    return dayMonthString + ' ' + time;
  }

  function renderReminders() {
    let renderedItems: any = [];

    reminders.forEach(item => {
      renderedItems.push(
        <ReminderListItem
          key={item.id}
          item={item}
          completeReminder={completeReminder}
          onEditPressed={onEditPressed}
        />,
      );
    });

    setRenderedReminders(renderedItems);
  }

  function renderCompletedReminders() {
    let renderedItems: any = [];

    completedReminders.forEach(item => {
      renderedItems.push(<CompletedReminderListItem key={item.id} item={item} />);
    });

    setRenderedCompletedReminders(renderedItems);
  }

  useEffect(() => {
    if (allReminders && isSuccess && !isLoading) {
      setReminders(allReminders.filter(r => !r.complete));
      setCompletedReminders(allReminders.filter(r => r.complete));
    }
  }, [allReminders, isSuccess, isLoading]);

  useEffect(() => {
    if (reminders.length > 0) {
      renderReminders();
    }
  }, [reminders]);

  useEffect(() => {
    if (completedReminders.length > 0) {
      renderCompletedReminders();
    }
  }, [completedReminders]);

  return (
    <>
      <View style={styles.container}>
        <Header title="Reminders" />
        <AddReminder
          addReminder={addReminder}
          reminderToEdit={reminderToEdit}
          setReminderToEdit={setReminderToEdit}
          editReminder={editReminder}
        />
        {!isLoading ? (
          <>
            {reminders.length > 0 || completedReminders.length > 0 ? (
              <>
                <ScrollView>
                  <>
                    {reminders.length > 0 && <>{renderedReminders}</>}

                    {completedReminders.length > 0 && (
                      <>
                        <View style={styles.dividerContainer}>
                          <Text style={styles.dividerCompleteText}>Complete</Text>
                          <View style={styles.divider} />
                        </View>
                        <TouchableOpacity style={styles.completeButton} onPress={deleteReminders}>
                          <Icon name="ios-trash-outline" size={20} style={styles.completeIcon} />
                        </TouchableOpacity>
                        <>{renderedCompletedReminders}</>
                      </>
                    )}
                  </>
                </ScrollView>
              </>
            ) : (
              <View style={styles.noItemsContainer}>
                <Text style={isDarkMode ? styles.noItemsTextDark : styles.noItemsText}>No Reminders</Text>
              </View>
            )}
          </>
        ) : (
          <Spinner visible={isLoading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
        )}
      </View>
      <SpecialModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
}
