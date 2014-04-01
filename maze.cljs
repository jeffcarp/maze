(ns maze)

(def graph (atom {}))
(def graph-size (atom 0))
(def walls (atom []))
(def frame-number (atom 0))
(def frame-time (atom 0))
(def canvas (atom {}))
(def context (atom {}))

(defn reset-canvas-aspect []
  (set! (.-width @canvas) (.-innerWidth js/window))
  (set! (.-height @canvas) (.-innerHeight js/window)))

(defn generate-square-graph [size]
  (zipmap (range size) (repeat size {})))

(defn at [coord]
  (get-in @graph coord))

(defn place [coord item]
  (swap! graph assoc-in coord item))

(defn is-cell [coord]
  (string? (at coord)))

(defn is-wall [coord]
  (not (string? (at coord))))

; From https://github.com/ibdknox/pinot/blob/master/src/pinot/draw/core.cljs
(def request-animation-frame
  (or ;(.-requestAnimationFrame js/window)
      ;(.-webkitRequestAnimationFrame js/window)
      ;(.-mozRequestAnimationFrame js/window)
      ;(.-oRequestAnimationFrame js/window)
      ;(.-msRequestAnimationFrame js/window)
      ;(fn [callback] (js/setTimeout callback 17))))
      (fn [callback] (js/setTimeout callback 1000))))


(defn draw []
  (dotimes [y (count @graph)]
    (dotimes [x (count @graph)]
      (if (maze/is-cell [y x])
        (do
          (set! (.-fillStyle @context) "navy")
          (.fillRect @context (* 10 x) (* 10 y) 10 10))
        (do
          (set! (.-fillStyle @context) "grey")
          (.fillRect @context (* 10 x) (* 10 y) 10 10))
      ))))

(defn von-neumann-neighborhood [coord]
  (apply vector
    (map
      (fn [dir]
        [(+ (first coord) (first dir)) (+ (last coord) (last dir))])
      [[-1 0] [1 0] [0 -1] [0 1]])))

(defn neighboring-walls [coord]
  (apply vector
    (filter is-wall (von-neumann-neighborhood coord))))

(defn get-time []
  (.round js/Math (.getTime (new js/Date))))

(defn random-neighbor-cell [coord]
  (rand-nth (apply vector (filter is-cell (von-neumann-neighborhood coord)))))

(defn opposite-cell [from to]
  (let [yDiff (- (first to) (first from))
        xDiff (- (last to) (last from))]
    [(+ (first to) yDiff) (+ (last to) xDiff)]))

(defn y [coord]
  (first coord))

(defn x [coord]
  (last coord))

(defn in-bounds [coord]
  (and
    (pos? (y coord))
    (pos? (x coord))
    (< (y coord) @graph-size)
    (< (x coord) @graph-size)))

(defn interv [wls]
  (let [rand-index (rand-int (count wls))
        wall (get wls rand-index)
        cell (random-neighbor-cell wall)
        opposite (opposite-cell cell wall)
        not-current-wall (fn [i val] (if (not (= i rand-index)) val))
        rest-of-walls (apply vector (keep-indexed not-current-wall wls))]
    (if (and (in-bounds opposite) (is-wall opposite))
      (do
        (place wall "wut")
        (place opposite "wut")))))
;        (apply vector
;          (concat
;            rest-of-walls
;            (neighboring-walls opposite))))
;      rest-of-walls)))

(defn animation-loop []
  (swap! frame-number inc)
  (let [start-time (maze/get-time)]

    (if (pos? (count @walls))
      (let [result (maze/interv @walls)]

        (maze/draw)

        (let [total-time (- (maze/get-time) start-time)
              frame-number-elem (.getElementById js/document "frame-number")
              wall-count (.getElementById js/document "wall-count")
              frame-time-elem (.getElementById js/document "frame-time")]
          (set! (.-innerHTML frame-time-elem) total-time)
          (set! (.-innerHTML wall-count) (count @walls))
          (set! (.-innerHTML frame-number-elem) @frame-number))

        (reset! walls result)

        (request-animation-frame animation-loop)))))

(defn ^:export start []

  (reset! canvas (.getElementById js/document "display"))
  (reset! context (.getContext @canvas "2d"))

  (reset-canvas-aspect)
  (set! (.-onresize js/window) (fn []
    (reset-canvas-aspect)
    (maze/draw)))

  (let [factor 10
        sizeY (.floor js/Math (/ (.-innerHeight js/window) factor))
        sizeX (.floor js/Math (/ (.-innerWidth js/window) factor))
        midY (.floor js/Math (/ sizeY 2))
        midX (.floor js/Math (/ sizeX 2))
        start-coord [midY midY]]
    (reset! graph-size sizeY)
    (reset! graph (generate-square-graph sizeY))
    (place start-coord "start")
    (reset! walls (neighboring-walls start-coord))
    (animation-loop)))

