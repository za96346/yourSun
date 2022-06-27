from package.apscheduler.schedulers.blocking import BlockingScheduler
from package.apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime, timedelta
from find_mail import find


sched = BlockingScheduler()

trigger = IntervalTrigger(minutes=5)
sched.add_job(find, trigger)


sched.start()


