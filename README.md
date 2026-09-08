# Cognoz

> An AI-powered adaptive cognitive gaming and memory-assistance platform.

**Version: v0.1.0**

---

## 1. Overview

Cognoz is an adaptive cognitive gaming and memory-assistance platform designed
for elderly users, with a focus on accessible, culturally relevant, and
multilingual cognitive engagement.

The system is based on the idea that different games exercise different
combinations of cognitive dimensions.

Rather than presenting every player with the same sequence of games, Cognoz
represents gameplay responses and game characteristics as vectors in a shared
four-dimensional cognitive space.

The Adaptive Decision Engine (ADEN) uses the player's persistent progression
state, gameplay response, game profile, and challenge settings to determine an
appropriate target region in this cognitive space.

The game selection layer then compares the target against the profiles of
available games and selects the closest suitable game.

The system is designed so that the adaptive computation remains independent
from individual games, persistent storage, backend implementation, and the
user interface.

---

# 2. Core Idea

The central concept of Cognoz is:

> **Games are the interface. ADEN is the adaptive computation core.**

A game produces raw gameplay data.

The Game Bridge converts game-specific output into standardized raw states.

The Session layer passes these states to the mathematical engine, which
converts them into formal vector representations.

ADEN then processes the relevant vectors together with the player's
progression state and challenge settings.

The adaptive pipeline produces a **Target Vector** representing the ideal
cognitive profile for the next challenge.

The Game Selection layer compares this target with the profiles of available
games and selects the closest suitable game.

Conceptually:

    Player
       │
       ▼
    Session
       │
       ▼
    Game Manager
       │
       ▼
    Play Game
       │
       ▼
    Raw Game Data
       │
       ▼
    Game Bridge
       │
       ▼
    Raw Game State
       │
       ▼
    Mathematical Engine
       │
       ├───────────────┐
       ▼               ▼
    Response Vector   Game Profile Vector
       │               │
       └───────┬───────┘
               │
               ▼
       Progression Update
               │
               ▼
       Updated Progression
               │
               ▼
            ADEN / ANN
               │
               ▼
          Target Vector
               │
               ▼
       Game Selection Layer
               │
               ▼
          Next Game

---

# 3. Cognitive Space

Cognoz v0.1.0 uses a four-dimensional cognitive space:

    [Memory, Focus, Adaptation, Processing Speed]

Each dimension is represented numerically.

For example:

    [0.80, 0.55, 0.72, 0.40]

represents a point in the four-dimensional cognitive space.

The same coordinate system is used for computational vector representations
throughout ADEN.

The dimensions represent the broad cognitive characteristics that Cognoz's
games are designed to engage.

They should not be interpreted as clinical measurements or diagnoses.

Future versions may introduce additional dimensions or model relationships
between existing dimensions.

---

# 4. Vector System

Cognoz uses a generic mathematical `Vector` representation inside the
adaptive computation layer.

The vector implementation is intentionally independent from any particular
semantic meaning.

For example:

    Vector([0.80, 0.55, 0.72, 0.40])

becomes meaningful as a cognitive vector only when interpreted according to
the defined cognitive-space convention.

Dimension order:

    [Memory, Focus, Adaptation, Processing Speed]

All cognitive vectors must follow this ordering unless explicitly documented
otherwise.

---

# 5. Vector Types

## 5.1 Progression State

The **Progression State** is the persistent representation of the player's
evolving progression.

It is owned by the persistence/session layer rather than by ADEN itself.

For example, the stored representation may look like:

    {
        memory: 0.42,
        focus: 0.61,
        adaptation: 0.35,
        processingSpeed: 0.57
    }

or an equivalent serialized array representation.

When ADEN performs computation, the stored progression state is converted into
a mathematical `Vector`.

Conceptually:

    Progression State
           │
           ▼
    Progression Vector
           │
           ▼
          ADEN

The distinction is intentional:

- **Progression State** = persistent/storage representation
- **Progression Vector** = computational representation
- **Vector** = generic mathematical class

The progression state is not intended to represent a clinical cognitive
score.

---

## 5.2 Response Vector

The **Response Vector** represents the player's observed response to a
specific game.

It is generated from game-specific raw gameplay data through the Game Bridge
and mathematical conversion layer.

Example:

    R = [0.72, 0.41, 0.00, 0.00]

The exact calculation depends on the game's mechanics and available
measurements.

Not every game needs to provide information about every dimension.

A zero component may mean that the game does not provide meaningful evidence
for that dimension; it does not mean that the player has zero ability in that
dimension.

For example, a memory-matching game may primarily provide information about
Memory and Focus.

---

## 5.3 Game Profile Vector

The **Game Profile Vector** represents the cognitive characteristics of a
game.

Example:

    Memory Matching = [0.90, 0.60, 0.00, 0.30]

A game can exercise multiple cognitive dimensions to different degrees.

For example:

    Memory Matching = [0.90, 0.60, 0.00, 0.30]
    Rule Switching   = [0.40, 0.70, 0.90, 0.70]

Game profiles are defined independently from individual player responses.

---

## 5.4 Target Vector

The **Target Vector** is the adaptive output generated by ADEN.

It represents the ideal cognitive region that the system wants the next
challenge to address.

Example:

    T = [0.75, 0.65, 0.82, 0.58]

The target does not need to correspond exactly to an existing game.

The Game Selection layer compares the target with available Game Profile
Vectors and selects the closest suitable game.

This separation allows the adaptive engine to reason about a desired target
without being directly coupled to the available game catalogue.

---

## 5.5 Challenge Level

Challenge preference influences how the adaptive engine generates the next
target.

Rather than treating difficulty purely as:

    Easy / Medium / Hard

Cognoz can use a challenge level or challenge setting to influence the
direction and magnitude of adaptation.

Conceptually:

    Supportive
        → bias toward more comfortable or stronger regions

    Challenging
        → bias toward more demanding or weaker regions

The challenge setting is an input to the adaptive computation.

It does not directly select a game.

---

## 5.6 Challenge Matrix

The **Challenge Matrix** represents the mathematical interpretation of
challenge influence within the adaptive model.

It provides a structured way to represent how challenge settings can influence
the cognitive dimensions and their interactions.

The matrix is part of the adaptive model rather than a persistent player
profile.

The exact matrix construction and transformation are intentionally modular so
that the mathematical model can evolve without changing the game layer.

---

# 6. Progression Model

Cognoz treats progression as an evolving state rather than a collection of
independent static scores.

After gameplay, the Response Vector and Game Profile Vector provide information
about the player's interaction with the particular challenge.

A deterministic mathematical progression model uses this information to
produce an updated progression state.

Conceptually:

    Previous Progression
           │
           │
    Response Vector
           │
           │
    Game Profile Vector
           │
           ▼
    Progression Update Model
           │
           ▼
    Updated Progression

The mathematical model is designed around the player's progression and the
direction of change rather than treating raw gameplay values as permanent
clinical measurements.

Directional relationships between vectors may be used to prevent proportional
changes from being interpreted as fundamentally different progression
directions.

The exact update function remains modular and can evolve as the platform
collects more gameplay data.

---

# 7. ADEN — Adaptive Decision Engine

ADEN stands for:

> **Adaptive Decision Engine**

ADEN is the computational core responsible for adaptive challenge generation.

ADEN is intentionally stateless.

It does not own or permanently store:

- player profiles
- sessions
- gameplay history
- database records
- offline state

Those responsibilities belong to the surrounding application and persistence
layers.

ADEN receives the required computational inputs and produces outputs.

Conceptually:

    Progression Vector
            │
            │
    Response Vector
            │
            │
    Game Profile Vector
            │
            │
    Challenge Level / Settings
            │
            ▼
    ┌─────────────────────────┐
    │          ADEN           │
    │                         │
    │ Progression Update      │
    │        +                │
    │ ANN Target Generation   │
    └───────────┬─────────────┘
                │
                ▼
          Target Vector

This separation makes ADEN:

- game-independent
- backend-independent
- database-independent
- easier to test
- easier to replace or improve
- deterministic for a fixed mathematical configuration
- suitable for future learned components

---

# 8. AI / ANN Component

Cognoz v0.1.0 uses a hybrid adaptive approach.

The progression update is based on a deterministic mathematical model.

The resulting progression information, together with challenge information, is
then provided to an Artificial Neural Network (ANN) to generate or influence
the Target Vector.

Conceptually:

    Previous Progression
           │
           ▼
    Mathematical Progression
          Update
           │
           ▼
    Updated Progression
           │
           ├───────────────┐
           │               │
           ▼               ▼
      Challenge Level    ANN / AI
                           │
                           ▼
                     Target Vector

The mathematical model provides a controlled and interpretable reference for
progression.

The ANN provides a learned component for generating the next adaptive target.

This hybrid structure also allows future versions to learn more of the
transformation pipeline as sufficient representative gameplay data becomes
available.

The system should not claim that the ANN provides clinical cognitive
assessment.

---

# 9. Game Selection

The Target Vector is not itself a game.

The Game Selection layer maps the target cognitive profile to the available
games.

For example:

    Target:

    T = [0.75, 0.65, 0.82, 0.58]

    Available games:

    G1 = [0.90, 0.60, 0.00, 0.30]
    G2 = [0.40, 0.80, 0.90, 0.70]
    G3 = [0.70, 0.50, 0.40, 0.80]

The selector calculates the distance between T and each Game Profile Vector.

A simple initial distance metric is Euclidean distance:

    d(T, G) = sqrt(
        (T_M  - G_M)^2  +
        (T_F  - G_F)^2  +
        (T_A  - G_A)^2  +
        (T_PS - G_PS)^2
    )

where:

    M  = Memory
    F  = Focus
    A  = Adaptation
    PS = Processing Speed

The game with the smallest suitable distance becomes the candidate next game.

Future versions may incorporate:

- dimension-specific importance
- accessibility constraints
- game availability
- recent-game history
- repetition avoidance
- session constraints
- caregiver-defined preferences

---

# 10. Game Manager

The **Game Manager** orchestrates game execution.

It is responsible for the lifecycle and communication of games rather than
making adaptive decisions.

Typical responsibilities include:

- registering available games
- loading games
- starting games
- configuring game parameters
- pausing/resuming games
- stopping games
- tracking active games
- communicating with embedded games
- receiving game completion events

The Game Manager does not determine which game is cognitively appropriate.

That responsibility belongs to the Game Selection layer.

Conceptually:

    Game Selection
          │
          │ selected game + configuration
          ▼
      Game Manager
          │
          ▼
       Game Layer

---

# 11. Game Bridge

The **Game Bridge** isolates individual game implementations from the rest of
the adaptive system.

Games may produce different types of raw gameplay information.

For example:

    Memory Matching
        → mistakes
        → moves
        → completion time

Another game may produce:

    Visual Search
        → reaction time
        → missed targets
        → false selections

The Game Bridge converts these game-specific outputs into standardized raw
states that can be consumed by the mathematical engine.

Conceptually:

    Game
      │
      ▼
    Raw Game Data
      │
      ▼
    Game Bridge
      │
      ▼
    Standardized Raw State
      │
      ▼
    Mathematical Engine
      │
      ▼
    Vector Representation

This keeps ADEN independent from individual game implementations.

Adding a new game should primarily require:

1. Implementing the game.
2. Defining its Game Profile Vector.
3. Defining its Game Bridge/adapter.
4. Registering the game with the Game Manager/Selection layer.

---

# 12. Session Management

A **Session** represents a gameplay period.

A session is separate from the player's persistent progression.

Starting a new session does not inherently reset the player's progression.

Conceptually:

    Persistent Progression
            │
            ▼
        New Session
            │
            ▼
          Game
            │
            ▼
       Game Results
            │
            ▼
    Updated Progression

The Session Manager is responsible for coordinating the current gameplay
context and passing relevant game states into the mathematical engine.

---

# 13. Offline Architecture

Cognoz is designed to support low-connectivity environments.

When network connectivity is unavailable, the application can continue using
locally stored progression and gameplay information.

The local layer should maintain enough information to preserve continuity,
including progression state and pending gameplay events.

Conceptually:

    ┌───────────────┐
    │ Offline State │
    │   / Storage   │
    └───────┬───────┘
            │
            ▼
      Session Manager
            │
            ▼
           ADEN
            │
            ▼
           Game
            │
            ▼
      Gameplay Event
            │
            ▼
      Offline Storage
            │
       Network Restored
            │
            ▼
      Sync Manager
            │
            ▼
       Backend / DB

Synchronization should avoid blindly overwriting newer state.

Gameplay events can use unique identifiers and version information so that
events can be synchronized safely and repeatedly without creating duplicate
records.

The exact storage technology may evolve; the architecture therefore refers to
this layer as **Offline Storage** rather than assuming a specific browser
storage implementation.

---

# 14. Data Flow

## Real-Time Adaptive Flow

    Progression State
          │
          ▼
    Progression Vector
          │
          │
    Game Result
          │
          ▼
    Game Bridge
          │
          ▼
    Raw Game State
          │
          ▼
    Mathematical Engine
          │
          ├───────────────┐
          ▼               ▼
    Response Vector   Game Profile Vector
          │               │
          └───────┬───────┘
                  ▼
        Progression Update
                  │
                  ▼
        Updated Progression
                  │
                  ▼
             ANN / ADEN
                  │
                  ▼
            Target Vector
                  │
                  ▼
        Game Selection Layer
                  │
                  ▼
            Game Manager
                  │
                  ▼
             Next Game


## Historical Analytics Flow

    Gameplay Events
          │
          ▼
       Database
          │
          ▼
    Historical Data
          │
          ▼
     AI Analytics
          │
          ▼
    Expert Dashboard

Historical analytics is separate from the real-time adaptive loop.

---

# 15. Historical / Caregiver Analytics

Cognoz can provide dashboards for caregivers, health workers, or authorized
experts.

Analytics may include:

- participation consistency
- gameplay history
- game completion patterns
- progression trends
- dimension-level changes over time
- response patterns
- aggregate regional trends
- unusual observations requiring attention

AI/ML may be used to analyze larger historical datasets and identify patterns
that are difficult to observe manually.

These analytics are intended as decision-support and analytical assistance.

They must not be presented as clinical diagnosis or as a replacement for
professional medical evaluation.

---

# 16. Privacy Architecture

Cognoz may use geographic information to produce regional aggregate
statistics.

Precise location should not become part of permanent regional analytics data
when it is not necessary.

Conceptually:

    Player Location
          │
          ▼
    Determine Predefined Region
          │
          ▼
    Update Regional Aggregate
          │
          ▼
    Precise Location Discarded

Regional statistics should not be exposed when participant counts are too small
to provide reasonable protection against re-identification.

The system should prefer predefined geographic regions rather than storing
precise coordinates for regional analytics.

Regional statistics are intended for population-level analysis and should not
be interpreted as diagnoses of individuals.

---

# 17. Accessibility and User Experience

Cognoz is designed for elderly users and therefore prioritizes:

- simple navigation
- large, readable interface elements
- clear visual feedback
- minimal interaction complexity
- voice-assisted interaction
- multilingual support
- culturally familiar themes
- accessible game mechanics
- low-connectivity operation

The platform is intended to support regional language and cultural adaptation,
particularly for users in the North Eastern Region of India.

---

# 18. Version v0.1.0

Cognoz v0.1.0 establishes the core adaptive architecture.

The version focuses on demonstrating the complete adaptive loop:

    Play
      ↓
    Observe
      ↓
    Convert Game Data
      ↓
    Generate Response Vector
      ↓
    Update Progression
      ↓
    Generate Target
      ↓
    Compare Game Profiles
      ↓
    Select Next Game
      ↓
    Play Again

The architecture is intentionally modular so that additional games,
languages, analytics, adaptive models, and storage capabilities can be added
without redesigning the core system.

---

# 19. Team Responsibilities

## Member 1 — Core / UI / Architecture

- HTML/CSS/JavaScript UI
- ADEN
- Vector system
- Mathematical model
- Game selection integration
- Architecture
- System integration
- Project oversight

## Member 2 — Games

- Game implementation
- AI-assisted game generation where appropriate
- Pygame development
- Pygbag compilation
- Game-layer integration
- Game output generation
- Game-specific adapters

## Member 3 — Database

- Database architecture
- Database schemas
- Backend APIs
- Persistent player/session data
- Gameplay event storage
- Regional aggregation
- Synchronization support

## Member 4 — Presentation / Testing

- Presentation design
- Functional testing
- Documentation support
- Demo preparation
- User-flow testing

## Member 5 — Presentation / Testing

- Project presentation
- Demo preparation
- Functional testing
- User-flow verification
- Presentation support

## Member 6 — Data / AI

- Dataset preparation
- Synthetic data generation
- Data processing
- ANN/ML development
- Historical analytics
- Analytics pipeline

---

# 20. Future Scope

Potential future developments include:

- More cognitive dimensions
- More games
- Dynamic game parameters
- More sophisticated progression transformations
- Learned progression transformations
- ANN-based progression updates
- Improved target generation
- Larger representative gameplay datasets
- More advanced AI analytics
- Larger regional datasets
- Privacy-preserving analytics
- Expert feedback loops
- Longitudinal analysis
- Personalized challenge generation
- Expanded multilingual and voice interaction
- Improved offline synchronization
- Additional caregiver tools

As sufficient gameplay data becomes available, learned models can be trained
against the deterministic mathematical reference model and validated before
being introduced into the adaptive pipeline.

---

# 21. Development Principles

1. Keep ADEN independent from individual games.
2. Keep persistent player data outside ADEN.
3. Keep the Game Manager focused on game lifecycle and execution.
4. Keep the Game Bridge responsible for game-specific data translation.
5. Keep game selection separate from adaptive computation.
6. Define interfaces before implementation.
7. Keep vector dimensions consistent across the entire system.
8. Do not silently change vector semantics.
9. Keep the mathematical progression model explicit and explainable.
10. Use AI where sufficient data and validation justify it.
11. Treat AI-generated findings as analytical assistance, not unquestionable
    authority.
12. Do not present game-derived measurements as medical diagnoses.
13. Design offline synchronization as part of the architecture rather than as
    an afterthought.
14. Document major architectural decisions.
15. Keep v0.1.0 focused while allowing the architecture to support future
    expansion.

---

# 22. Current Vector Convention

Dimension order:

    [Memory, Focus, Adaptation, Processing Speed]

Example:

    [0.8, 0.5, 0.7, 0.4]

means:

    Memory            = 0.8
    Focus             = 0.5
    Adaptation        = 0.7
    Processing Speed  = 0.4

Every cognitive vector must use this ordering.

---

# 23. Important Terminology

### Progression State

Persistent representation of the player's evolving progression.

### Progression Vector

Computational vector representation created from the Progression State for
use inside ADEN.

### Response Vector

Standardized representation of a player's observed response to a particular
game.

### Game Profile Vector

Vector describing the cognitive characteristics of a game.

### Target Vector

Adaptive output representing the ideal cognitive profile for the next
challenge.

### Challenge Level

User/session-level challenge preference that influences adaptive target
generation.

### Challenge Matrix

Mathematical representation of challenge influence within the adaptive model.

### Game Manager

Orchestrates game loading, configuration, lifecycle, and communication.

### Game Bridge

Translates game-specific raw output into standardized states and isolates game
implementations from the adaptive engine.

### Session Manager

Coordinates the current gameplay session and passes relevant game states into
the mathematical engine.

### Game Selection Layer

Compares the Target Vector against available Game Profile Vectors and selects
a suitable next game.

### ADEN

Adaptive Decision Engine.

The stateless computational core responsible for progression transformation and
adaptive target generation.

### AI Analytics

Historical or population-level analysis performed outside the real-time
adaptive loop.

---

# 24. Disclaimer

Cognoz is an adaptive cognitive gaming and memory-assistance platform.

Gameplay-derived vectors, scores, trends, and analytics are not clinical
diagnoses and should not be interpreted as definitive measurements of a
person's cognitive health.

Cognoz is intended to support engagement, memory assistance, adaptive
gameplay, and analytical decision support rather than replace professional
medical assessment.