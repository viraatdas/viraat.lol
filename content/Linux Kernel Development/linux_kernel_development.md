# Chapter 3

- _fork()_ is implemented through Copy-on-write (COW)
  - technique to delay or altogether prevent copying of the data.
  - The parent and child can share a single copy of the address space
  - If it’s written to, a duplicate is made and each process receives a unique copy
- _vfork() -_ child executing in a new address space → the child executes as the sole thread in the parent’s address space and parent is blocked untilt the child either calls _exec()_ or exits
- Lookin into _ptracing_ and why that is beneficial

# Chapter 4 - Processor Scheduling

- Multitasking operating systems
  - cooperative
    - act of process voluntarily suspending itself is called yielding
    - Mac OS 9 (and earlier) and Windows 3.1 (and earlier) employed cooperative multitsking
  - preemptive
    - Linux like other Unix variants and most modern OS implements this
    - timeslice - time a process runs is predetermined
- During 2.5 kernel development series, the Linux kernel received a scheduler overhaul
  - new scheduler called the O(1) scheduler solve the shortcomings of the previous Linux scheduler
    - constant-time algorithm for timeslice calculating and per-processor runqueues
    - It. had issues with latency-sensitive applications. These applications were called interactive processes which includes any application with which the user interactions
    - It performed well with large server workfload - whcih lack interactive processes - it perform below par on desktop dystem, where interactive applications are the _raison d’être_
- 2.6 kernel series introduced new process schedulers - most notable was the Rotating Straicase Deadline scheduler - introduced the concept of fair scheduling
  - this replace the O(1) scheduler replacement in 2.6.23, the Completely Fair Scheduler, CFS

## Policy

behavior of scheduler that determines what runs when.

### I/O-Bound versus processor-bound processes

- I/O-bound
  - I/O means any type of blockable resource such as keyboard input or network I/O, not just disk I/O
  - this is a process that psneds much of its time submitting and waiting on I/O requests
  - because of this, it’s only runnable for short durations
  - Most GUI aplications are this - because they spend most their time waiting on user interactive via the keyboard and mouse
- process-bound
  - spend much of their time executing code
  - example an infinite loop or lot of mathematicaly calculations like MATLAB or ssh-keygen
- Process can exhibit both behaviors
  - X window Server is both
  - Word processor where it waits for key presses but then might jump into rapid fit of spell checking or macro calculation
- scheduling policy must attempt to satisfy two conflicting goals: fast process response time (low latency) and maximal system utilization time (high throughput)
  - Linux and Unix tends to favor I/O bound processes over processor bound processes

## Process Priority

- common type of scheduling algorithm is priority-based scheduling
  - rank processed based on their worht and need for processor time
  - processes with a higher priority run before those with a lower priority
  - same pritiy are scheduled round-robin
  - On some systems, processes with a higher priotiy also receive a longer timeslice
- Linux kernel implements two separate priority ranges
  - _nice_ value
    - a number from -20 to +19 with a default of 0.
    - larger nice values correspond to lower priotiy - you are being “nice” to the other processes on the system
    - Processes with a lower nice value (higher priority) receive a larger proportion of the system’s processor
    - Nice values are the stadnard priority range used in all Unix system
    - Mac OS X, the nice value is a control over the absolute timeslice allotated to a process
    - in linux it is a control over the proportion of timeslice
  - real-time priority
    - by default range from 0 to 99 inclusive
    - Linux implementes real-time priroity in accordance with the relevant Unix standards, specifically POSIX.1b
    - higher real-time priority values correspodn to a greater priority

## Timeslice (quantum or processor slice)

- numeric value that represents how long a task can run until it is preempted
- In Linux is a proprotion assigned based on the nice value
- In Linux, under the new CFS scheduler, the decision is a function of how much of a proportion of the processor the newly runnable processor has consumed.

## Scheduling Policy in Action

- System with two runnable tasks: text editor and a video encoder
- text editor is I/O bound and video processor
- Lets say they have the same nice value, they get allotted 50% each
- Linux guarantees half of the processor time.

## Linux Scheduling Algorithm

### Scheduler classes

Linux is modular enabling different algorithms to schedule different types of processes. This modularity is called scheduler classes.

CFS is registered scheduler class for normal processes, called _SCHED_NORMAL_ in Linux (and _SCHED_OTHER_ in POSIX).

## Processing Scheduling in Unix systems

- priority
  - process with higher priority run more frequently and receive a higher timeslice (typically)
- timeslice
  - how long a process runs; they start with some default timeslice
- Unix the priority is exported to user-space in the form of nice values. This leads to a lot of problems though.
  1. mapping nice values onto timeslices requires a decision about what absolute timeslot to allot each nice value. This leads to suboptimal switching behavior.
  2. Relative nice values and again the nice value to timeslice mapping.
- Reread timeslice mapping chapter after Chapter 11
