# Cognoz

> An AI-based adaptive cognitive gaming and analytics platform.

## 1. Overview

Cognoz is an adaptive cognitive gaming platform designed around the idea that
different games can exercise different combinations of cognitive abilities.

Rather than assigning every player the same sequence of games, Cognoz represents
both the player's gameplay response and each game's cognitive characteristics
as vectors in a shared cognitive space.

An adaptive engine transforms these vectors to determine the **ideal cognitive
profile of the next challenge**, and then selects the available game whose
profile is closest to that ideal.

The MVP focuses on four dimensions:

- Memory
- Focus
- Adaptation
- Processing

The system is designed so that the mathematical engine is independent of the
games, backend language, and database implementation.

---

# 2. Core Idea

The central concept of Cognoz is:

> **Games are the interface. The adaptive engine is the core product.**

A game produces behavioral/gameplay data.

That data is converted into a status vector.

The adaptive engine processes the relevant vectors and produces a target vector.

The target vector represents:

> **The ideal game/challenge profile that the engine wants the player to
> experience next.**

The system then compares this target against the profiles of available games
and selects the closest suitable game.

Conceptually:

    Player
       │
       ▼
    Play Game
       │
       ▼
    Gameplay Data
       │
       ▼
    Status Vector
       │
       ├──────────────┐
       ▼              ▼
    Weight Update   Challenge
       │              Vector
       └───────┬──────┘
               ▼
        Adaptive Engine
               │
               ▼
         Target Vector
               │
               ▼
       Game Profile Matching
               │
               ▼
          Next Game


# 3. Cognitive Space

The MVP uses a four-dimensional cognitive space:

    [Memory, Focus, Adaptation, Processing]

Each dimension is represented numerically, normally within a normalized range.

For example:

    [0.80, 0.55, 0.72, 0.40]

represents a point in the four-dimensional cognitive space.

The same space is used to represent:

- player/gameplay responses
- game profiles
- challenge directions
- adaptive targets
- other engine-level vectors

The dimensions are not necessarily independent. Future versions may model
relationships between dimensions.


# 4. Vector Types

## 4.1 Status Vector

Represents the observed result of a completed game.

Example:

    S = [0.72, 0.41, 0.68, 0.53]

The exact calculation of each component depends on the game's raw gameplay data.

The status vector represents **what happened during the game**, rather than
being a permanent medical or cognitive assessment of the player.


## 4.2 Game Vector

Represents the cognitive characteristics of a game.

Example:

    Pair Match = [0.90, 0.60, 0.30, 0.40]

A game does not have to belong exclusively to one dimension.

Games should generally exercise multiple dimensions to varying degrees.

Example:

    Memory Game = [0.9, 0.6, 0.3, 0.4]
    Rule Switch = [0.4, 0.7, 0.9, 0.7]


## 4.3 Weight Vector

Represents the player's observed progression/sensitivity across dimensions.

The weight vector is NOT the player's absolute cognitive score.

It is updated based on how the player's gameplay results change in relation
to the games they play.

Example:

    W = [1.10, 0.85, 1.30, 0.95]

The exact update function is defined by the adaptive engine.


## 4.4 Challenge Vector

Represents the desired challenge direction.

A challenge vector pushes the adaptive target toward a particular region of
the cognitive space.

Challenge values may be represented as signed values:

    C = [-0.2, +0.8, +0.5, -0.1]

This allows the challenge strategy to push dimensions in different directions.

The challenge vector does not directly select a game.


## 4.5 Target Vector

The target vector is the output of the adaptive engine.

It represents the **ideal game/challenge profile** that the engine wants to
present next.

Example:

    T = [0.75, 0.65, 0.82, 0.58]

The target vector does not have to correspond to an existing game.

The game selector finds the available game whose profile is closest to T.


# 5. Game Selection

If the target vector is:

    T = [0.75, 0.65, 0.82, 0.58]

and the available games have profiles:

    G1 = [0.90, 0.60, 0.30, 0.40]
    G2 = [0.40, 0.80, 0.90, 0.70]
    G3 = [0.70, 0.50, 0.40, 0.80]

the selector calculates the distance between T and each game profile.

A simple initial distance metric is Euclidean distance:

    d(T, G) = sqrt(
        (T_M - G_M)^2 +
        (T_F - G_F)^2 +
        (T_A - G_A)^2 +
        (T_P - G_P)^2
    )

The game with the smallest distance becomes the candidate next game.

The distance function may later incorporate weights or other constraints.


# 6. Challenge Strategy

Cognoz does not treat difficulty as a simple "Easy / Medium / Hard" switch.

Instead, challenge preference influences the direction in which the target
vector is moved.

For example:

    Supportive
        → target is biased toward more comfortable/stronger regions.

    Challenging
        → target is biased toward weaker or more demanding regions.

The challenge vector therefore acts as a transformation/directional influence
rather than directly choosing a game.


# 7. Adaptive Engine

The engine is intentionally designed to be stateless.

It does NOT own or permanently store player profiles.

Conceptually:

    Input Vectors
         │
         ▼
    Transformations
         │
         ▼
    Target Vector
         │
         ▼
    Output

The backend/database is responsible for persistent player information.

The engine only performs computation.

This makes the engine:

- language-independent in concept
- game-independent
- easier to test
- easier to replace or improve
- deterministic when given the same inputs


# 8. Mathematical Model

The initial conceptual model is based on vector transformations.

A simplified form is:

    S' = W ⊙ S

where ⊙ represents element-wise multiplication.

The challenge direction may then influence the target:

    T = S' + λC

where λ controls the strength of the challenge influence.

A future version may use a matrix transformation:

    T = M(W ⊙ S) + λC

where M represents relationships between cognitive dimensions.

This allows the model to represent interactions between dimensions instead
of treating them as completely independent.

The exact mathematical model is still under development and should remain
modular.


# 9. AI Component

The project uses AI in two major areas.

## Challenge Model

A machine-learning model may be used to generate or influence the challenge
vector.

The mathematical adaptive engine then uses that vector as one of its inputs.

This keeps the core game-selection mechanism explainable.

## Historical / Population Analytics

Historical gameplay data can be analyzed using AI/ML to identify:

- longitudinal trends
- behavioral patterns
- clusters
- unusual observations
- regional aggregate trends
- relationships between game types and performance

The analytics system is separate from the real-time adaptive engine.

AI-generated findings are intended as analytical assistance and should not be
treated as medical diagnoses.


# 10. Data Flow

## Real-time game flow

    Game
      │
      ▼
    Raw Gameplay Data
      │
      ▼
    Status Vector
      │
      ▼
    Adaptive Engine
      │
      ▼
    Target Vector
      │
      ▼
    Game Profiles
      │
      ▼
    Selected Game


## Historical analytics flow

    Gameplay Data
          │
          ▼
       Database
          │
          ▼
    Aggregate / Historical Data
          │
          ▼
      AI Analytics
          │
          ▼
    Expert Dashboard


# 11. Privacy Architecture

Cognoz may use geographic information to produce regional aggregate
statistics.

Precise location should not become part of the permanent regional analytics
record.

Conceptually:

    Player Location
          │
          ▼
    Determine predefined region
          │
          ▼
    Update regional aggregate
          │
          ▼
    Location discarded

Regional statistics should not be exposed when the participant count is too
small to provide reasonable protection against re-identification.

The MVP should use predefined geographic regions rather than storing precise
coordinates for analytics.

Regional statistics are intended for population-level analysis and should not
be interpreted as diagnoses of individuals.


# 12. Architecture

    ┌──────────────────────────────┐
    │            UI                │
    │          HTML/CSS/JS         │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │         Game Layer            │
    │       Python / Pygame        │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │        Backend / API          │
    └──────────────┬───────────────┘
                   │
             ┌─────┴─────┐
             ▼           ▼
       ┌──────────┐  ┌────────────┐
       │ Adaptive │  │  Database  │
       │  Engine  │  │            │
       └────┬─────┘  └─────┬──────┘
            │              │
            ▼              ▼
       Next Game      Historical Data
                           │
                           ▼
                      AI Analytics
                           │
                           ▼
                    Expert Dashboard


# 13. Team Responsibilities

## Member 1 — Core / UI / Architecture

- HTML/CSS/JavaScript UI
- Adaptive engine
- Vector system
- Integration/architecture
- Project overview

## Member 2 — Games

- Game implementation
- AI-assisted game generation where appropriate
- Pygame compilation
- Game-layer integration
- Game output/status generation

## Member 3 — Database

- Database architecture
- Schemas
- APIs
- Persistent data
- Regional aggregation

## Member 4 — Presentation / Testing

- Presentation design
- Functional testing
- Documentation support
- Demo preparation

## Member 5 — Presentation / Testing

- Project presentation
- Demo preparation
- Functional testing
- User-flow verification

## Member 6 — Data / AI

- Dataset preparation
- Synthetic data generation
- Data processing
- AI/ML model development
- Analytics pipeline


# 14. MVP Scope

The MVP should demonstrate the complete adaptive loop:

    Play
      ↓
    Observe
      ↓
    Generate status
      ↓
    Update weights
      ↓
    Apply challenge strategy
      ↓
    Generate target
      ↓
    Compare against games
      ↓
    Select next game
      ↓
    Play again

The MVP does NOT need to implement every possible future feature.

Priority should be given to demonstrating the adaptive mechanism clearly.


# 15. Future Scope

Potential future developments include:

- More cognitive dimensions
- More games
- Dynamic game parameters
- More sophisticated transformations
- Learned transformation matrices
- More advanced AI analytics
- Larger regional datasets
- Improved privacy-preserving analytics
- Expert feedback loops
- Longitudinal analysis
- Personalized challenge generation


# 16. Development Principles

1. Keep the adaptive engine independent from individual games.
2. Keep persistent user data outside the engine.
3. Define interfaces before implementation.
4. Keep vector dimensions consistent across the entire system.
5. Do not silently change vector semantics.
6. Prefer explainable transformations for the MVP.
7. Keep the MVP smaller than the long-term vision.
8. Treat AI as an analytical component, not unquestionable authority.
9. Do not present game-derived measurements as medical diagnoses.
10. Document major architectural decisions.


# 17. Current Vector Convention

Dimension order:

    [Memory, Focus, Adaptation, Processing]

All components should use this ordering unless explicitly documented otherwise.

Example:

    [0.8, 0.5, 0.7, 0.4]

means:

    Memory       = 0.8
    Focus        = 0.5
    Adaptation   = 0.7
    Processing   = 0.4


# 18. Important Terminology

Status Vector
    Observed result produced from gameplay.

Game Vector
    Cognitive profile of a game.

Weight Vector
    Represents observed progression/sensitivity used by the adaptive model.

Challenge Vector
    Represents the desired challenge direction.

Target Vector
    The ideal game/challenge profile produced by the adaptive engine.

Game Selector
    Finds the available game closest to the target vector.

Adaptive Engine
    Stateless mathematical system that transforms its input vectors into a
    target vector.

AI Analytics
    Historical/population-level analysis performed outside the real-time
    adaptive engine.
